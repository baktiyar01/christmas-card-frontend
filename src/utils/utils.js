import emailjs from "@emailjs/browser";
import axios from "axios";

export const sendEmail = (name, targetEmail, message, link) => {
  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  const templateParams = {
    from_name: name,
    from_email: targetEmail,
    message: message,
    link: link,
  };

  emailjs.send(serviceId, templateId, templateParams, publicKey).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
};

export const saveCard = async (name, targetEmail, message) => {
  console.log(name, targetEmail, message);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_PUBLIC_URL}/send-card`,
      {
        name,
        targetEmail,
        message,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error", error);
  }
};
