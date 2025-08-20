"use client";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

export default function Contact() {
  const contact = useRef();
  const ejssid = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const ejstid = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const ejspk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(ejssid, ejstid, contact.current, ejspk).then(
      () => {
        Swal.fire({
          title: "Succesful!",
          text: "Message Sent",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        contact.current.reset();
      },
      (error) => {
         Swal.fire({
          title: "Error!",
          text: "Message Not Sent",
          icon: "Warning",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        console.error(error.text);
      }
    );
  };

  return (
    <div className="p-12 mt-16">
      <div className="flex justify-center mb-16">
        <div className="flex flex-col leading-3">
          <h1 className="text-4xl font-bold text-center">tell the dev</h1>
          <p className="font-normal text-normal text-center">
            — your ideas, my code
          </p>
        </div>
      </div>

      <form ref={contact} className="flex flex-col gap-2 justify-center">
        <input
          name="name"
          className="bg-panel p-2 w-full h-auto rounded"
          type="text"
          placeholder="full name"
        />
        <input
          name="email"
          className="bg-panel p-2 w-full h-auto rounded"
          type="text"
          placeholder="email address"
        />
        <input
          name="title"
          className="bg-panel p-2 w-full h-auto rounded"
          type="text"
          placeholder="subject"
        />
        <textarea
          name="message"
          className="bg-panel p-2 w-full h-[24vh] rounded"
          type="text"
          placeholder="message"
        />
        <button
          onClick={sendEmail}
          className="p-2 bg-highlight rounded text-normal font-normal"
        >
          send email
        </button>
      </form>
    </div>
  );
}
