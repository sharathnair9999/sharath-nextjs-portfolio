import React, { useRef } from "react";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
type Props = {
  contactNumber: string;
  emailAddress: string;
  location: string;
  contactPerson: string;
};
const Contact = ({
  contactPerson,
  contactNumber,
  emailAddress,
  location,
}: Props) => {
  const form: any = useRef();
  const sendEmail = (e: any) => {
    e.preventDefault();
    // const serviceID: string = ;
    emailjs
      .sendForm(
        `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`,
        form.current,
        `${process.env.NEXT_PUBLIC_EMAILJS_USER_ID}`
      )
      .then(
        (result) => {
          toast.success(`Sent your message to ${contactPerson}!`);
          e.target.reset();
        },
        (error) => {
          toast.error(error.text);
        }
      );
  };
  return (
    <>
      <div className="min-h-screen relative flex flex-col text-center md:text-left px-10 justify-center gap-5 md:justify-evenly mx-auto items-center">
        <h3 className="section-title">Contact</h3>
        <div className="flex flex-col space-y-8 mt-5">
          <h4 className="dark:text-gray_300 text-lg md:text-3xl font-semibold text-center">
            Got something for me?{" "}
            <span className="underline decoration-blue_700 underline-offset-4">
              Gotcha!
            </span>
          </h4>
          <div className="space-y-2 lg:space-y-4 flex flex-col items-start mx-auto">
            <div className="flex items-center space-x-3 justify-center">
              <PhoneIcon className="text-blue_900 dark:text-blue_600 h-7 w-7 animate-pulse" />
              <a
                href={`tel:${contactNumber}`}
                className="dark:text-gray_300 text-md md:text-xl"
              >
                Give me a call
              </a>
            </div>
            <div className="flex items-center space-x-3 justify-center">
              <MapPinIcon className="text-blue_900 dark:text-blue_600 h-7 w-7 animate-pulse" />
              <p className="dark:text-gray_300 text-md md:text-xl">
                {location}
              </p>
            </div>
            <div className="flex items-center space-x-3 justify-center">
              <EnvelopeIcon className="text-blue_900 dark:text-blue_600 h-7 w-7 animate-pulse" />
              <a
                href={`mailto:${emailAddress}`}
                className="dark:text-gray_300 text-md md:text-xl"
              >
                Write to me!
              </a>
            </div>
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col space-y-3 mx-auto max-w-sm"
          >
            <div className="flex gap-3 flex-wrap sm:flex-nowrap ">
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
              className="contact-input resize-none overflow-y-auto scrollbar-thin scrollbar-track-gray_50/40 scrollbar-track-rounded-md scrollbar-thumb-rounded-md scrollbar-thumb-blue_900 h-32 "
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
