export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { fullName, phone, province, address, quantity, selectedColor, finalTotal } = req.body || {};

    if (!fullName || !phone || !province || !address || !quantity || !selectedColor || !finalTotal) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN || '8249247789:AAE9saD1Bjz5L9Zqg_jZae9I5fYet0DzxGY';
    const chatId = process.env.TELEGRAM_CHAT_ID || '7917961504';

    const runsFreeGift = quantity >= 2;
    const giftStatus = runsFreeGift 
      ? "✅ نعم (قارورة الثلج الأصلية مجاناً مضافة للتوصيل)" 
      : "❌ لا (العرض متوفر فقط عند شراء قارورتين أو أكثر)";

    const messageText = `⚡ *طلب جديد ومؤكد من SOFEX* ⚡\n\n` +
      `👤 *اسم الزبون الكامل:* ${fullName}\n` +
      `📞 *رقم الهاتف للاتصال:* \`${phone}\`\n` +
      `📍 *الولاية المحددة:* ${province}\n` +
      `🏠 *العنوان السكني بالتفصيل:* ${address}\n\n` +
      `-----------------------------------------\n` +
      `📦 *تفاصيل الطلب والكمية:* ${quantity} قارورات ألوان (2 كغ)\n` +
      `🎨 *الألوان المطلوبة:* ${selectedColor}\n` +
      `🎁 *الهدية المجانية:* ${giftStatus}\n` +
      `-----------------------------------------\n` +
      `💰 *المبلغ المستحق الدفع (مع الشحن):* *${finalTotal} دج*`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Failed to send message to Telegram from Vercel Serverless:", errText);
      return res.status(500).json({ success: false, error: "Telegram API Error" });
    }

    const result = await response.json();
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error sending order notification from Vercel Serverless:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
