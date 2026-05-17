import { Request, Response } from 'express'
import { prisma } from '../config/database'
import { hashPassword, comparePassword, generateToken, generateOTP } from '../utils/helpers'
import type { AuthRequest } from '../types'

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' })
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null
      }
    })

    const otpCode = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await prisma.oTP.upsert({
      where: { email },
      update: { code: otpCode, attempts: 0, expiresAt },
      create: { email, code: otpCode, expiresAt }
    })

    console.log(`OTP for ${email}: ${otpCode}`)

    res.status(201).json({
      success: true,
      message: 'User created successfully. Please verify your email.',
      userId: user.id,
      otpCode
    })

  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body

    const otpRecord = await prisma.oTP.findUnique({ where: { email } })
    if (!otpRecord) {
      return res.status(400).json({ error: 'OTP not found or expired' })
    }

    if (new Date() > otpRecord.expiresAt) {
      await prisma.oTP.delete({ where: { email } })
      return res.status(400).json({ error: 'OTP has expired' })
    }

    if (otpRecord.attempts >= 3) {
      await prisma.oTP.delete({ where: { email } })
      return res.status(400).json({ error: 'Too many attempts. Please request a new OTP' })
    }

    if (otpRecord.code !== otp) {
      await prisma.oTP.update({
        where: { email },
        data: { attempts: otpRecord.attempts + 1 }
      })
      return res.status(400).json({ error: 'Invalid OTP' })
    }

    await prisma.user.update({
      where: { email },
      data: { verified: true }
    })

    await prisma.oTP.delete({ where: { email } })

    res.json({
      success: true,
      message: 'Email verified successfully'
    })

  } catch (error) {
    console.error('OTP verification error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    if (!user.verified) {
      return res.status(401).json({ error: 'Please verify your email first' })
    }

    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = generateToken({ userId: user.id, email: user.email })

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      verified: user.verified,
      joinDate: user.createdAt
    }

    res.json({
      success: true,
      message: 'Login successful',
      user: userData,
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        verified: true,
        createdAt: true
      }
    })

    res.json({
      success: true,
      user
    })

  } catch (error) {
    console.error('Profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}