import React, { useRef } from "react";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
type Props = {};
type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
const Contact = (props: Props) => {
  const form: any = useRef();
  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2yssdig",
        "template_ghmawif",
        form.current,
        "a4_QozzlMxhLLbCD2"
      )
      .then(
        (result) => {
          toast.success("Sent your message to Sharath!");
          e.target.reset();
        },
        (error) => {
          toast.error(error.text);
        }
      );
  };
  return (
    <>
      <div className="h-screen relative flex flex-col text-center md:text-left md:flex-row px-10 justify-evenly mx-auto items-center">
        <h3 className="section-title">Contact</h3>
        <div className="flex flex-col space-y-8 mt-20 md:mt-12">
          <h4 className="dark:text-gray_300 text-lg md:text-3xl font-semibold text-center">
            Got something for me?{" "}
            <span className="underline decoration-blue_700 underline-offset-4">
              Gotcha!
            </span>
          </h4>
          <div className="space-y-2 lg:space-y-4 flex flex-col items-start mx-auto">
            <div className="flex items-center space-x-3 justify-center">
              <PhoneIcon className="text-blue_900 dark:text-blue_600 h-7 w-7 animate-pulse" />
              <p className="dark:text-gray_300 text-md md:text-xl">
                +91-9701256071
              </p>
            </div>
            <div className="flex items-center space-x-3 justify-center">
              <MapPinIcon className="text-blue_900 dark:text-blue_600 h-7 w-7 animate-pulse" />
              <p className="dark:text-gray_300 text-md md:text-xl">
                Hyderabad, Telangana, India
              </p>
            </div>
            <div className="flex items-center space-x-3 justify-center">
              <EnvelopeIcon className="text-blue_900 dark:text-blue_600 h-7 w-7 animate-pulse" />
              <p className="dark:text-gray_300 text-md md:text-xl">
                sharathnair9999@gmail.com
              </p>
            </div>
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col space-y-2 mx-auto max-w-sm"
          >
            <div className="flex gap-2 flex-wrap sm:flex-nowrap ">
              <input
                name="name"
                required
                placeholder="Name"
                className="contact-input w-full"
                type="text"
              />
              <input
                required
                name="email"
                placeholder="Email"
                className="contact-input w-full"
                type="text"
              />
            </div>
            <input
              required
              name="subject"
              placeholder="Subject"
              className="contact-input"
              type="text"
            />
            <textarea
              required
              name="message"
              placeholder="Message"
              className="contact-input"
            ></textarea>
            <button className="bg-blue_900/90 transition-all hover:bg-blue_900 text-gray_100 rounded-md font-bold py-2">
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Contact;
