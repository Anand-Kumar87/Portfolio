import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { 
  escapeHtml, 
  getAdminNotificationEmailHtml, 
  getClientThankYouEmailHtml 
} from '@/lib/emailTemplates';

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

    const emailUser = process.env.EMAIL_USER || 'solestyle41@gmail.com';
    const emailPass = process.env.EMAIL_PASS || 'luvg dfjm hzau igpi';
    const emailTo = process.env.EMAIL_TO || emailUser;

    if (!emailUser || !emailPass) {
      console.warn('Email credentials not configured in environment variables');
      return NextResponse.json(
        { message: 'Message received. Email service is running in mock mode.' }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject?.trim() || 'Portfolio Contact Submission');
    const safeMessage = escapeHtml(message.trim());

    // 1. Send Ultra-Premium Notification to Admin (Anand Kumar)
    const adminMailPromise = transporter.sendMail({
      from: `"Portfolio Contact Gateway" <${emailUser}>`,
      replyTo: safeEmail,
      to: emailTo,
      subject: `🚀 New Portfolio Inquiry: ${safeSubject} (from ${safeName})`,
      html: getAdminNotificationEmailHtml({
        name: safeName,
        email: safeEmail,
        subject: safeSubject,
        message: safeMessage,
      }),
    });

    // 2. Send Ultra-Premium Confirmation Auto-Reply to Client
    const clientFirstName = safeName.split(' ')[0] || safeName;
    const clientMailPromise = transporter.sendMail({
      from: `"Anand Kumar | Full Stack Developer" <${emailUser}>`,
      replyTo: emailUser,
      to: safeEmail,
      subject: `✨ Thank you for reaching out, ${clientFirstName}! — Anand Kumar`,
      html: getClientThankYouEmailHtml({
        name: safeName,
        email: safeEmail,
        subject: safeSubject,
        message: safeMessage,
      }),
    });

    // We execute both concurrently. Ensure admin email always succeeds; client auto-reply failure shouldn't abort admin delivery.
    const [adminResult, clientResult] = await Promise.allSettled([
      adminMailPromise,
      clientMailPromise,
    ]);

    if (adminResult.status === 'rejected') {
      console.error('Admin email error:', adminResult.reason);
      throw new Error(adminResult.reason?.message || 'Failed to deliver notification email');
    }

    if (clientResult.status === 'rejected') {
      console.warn('Client auto-reply delivery warning:', clientResult.reason);
    }

    return NextResponse.json({ 
      message: 'Message sent successfully! A confirmation email has also been sent to you.',
      success: true 
    });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}