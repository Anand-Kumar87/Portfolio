import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const escapeHtml = (str) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, _hp } = body;

    // Honeypot check for bots
    if (_hp) {
      return NextResponse.json({ message: 'Email sent successfully' });
    }

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Input exceeds maximum allowed length' },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email credentials not configured in environment variables');
      return NextResponse.json(
        { message: 'Message received. Email service is running in mock mode.' }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject || 'Portfolio Contact Submission');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: safeEmail,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${safeSubject} (from ${safeName})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
          <h2 style="color: #4F46E5; border-bottom: 2px solid #E5E7EB; padding-bottom: 8px;">
            New Contact Form Submission
          </h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <div style="background-color: #F9FAFB; border-left: 4px solid #4F46E5; padding: 15px; margin-top: 15px;">
            <h4 style="margin-top: 0; color: #374151;">Message:</h4>
            <p style="white-space: pre-wrap; margin-bottom: 0;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}