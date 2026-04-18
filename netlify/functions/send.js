const { Resend } = require("resend");

exports.handler = async function(event) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "amtngo@naver.com",
      subject: "무조건 보내기 테스트",
      html: "메일 테스트"
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
};
