const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const SocialSchema = new mongoose.Schema({
  platform: String,
  url: String,
  icon: String,
  order: Number,
});

const Social = mongoose.models.Social || mongoose.model('Social', SocialSchema);

async function addSocials() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const socials = [
      { platform: 'github', url: 'https://github.com/yourusername', order: 1 },
      { platform: 'linkedin', url: 'https://linkedin.com/in/yourusername', order: 2 },
      { platform: 'twitter', url: 'https://twitter.com/yourusername', order: 3 },
      { platform: 'email', url: 'mailto:solestyle41@gmail.com', order: 4 },
      { platform: 'whatsapp', url: 'https://wa.me/8726540277', order: 5 },
    ];

    for (const social of socials) {
      await Social.findOneAndUpdate(
        { platform: social.platform },
        social,
        { upsert: true }
      );
      console.log(`✅ Added ${social.platform}`);
    }

    console.log('\n✅ All social links added!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addSocials();