import React from "react";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
type Props = {};
type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
const Contact = (props: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {};
  return (
    <div className="h-screen relative flex flex-col text-center md:text-left md:flex-row px-10 justify-evenly mx-auto items-center">
      <h3 className="absolute md:top-8 top-16 uppercase tracking-[20px] text-gray-500 text-2xl ">
        Contact
      </h3>
      <div className="flex flex-col space-y-8 mt-20 md:mt-12">
        <h4 className="dark:text-gray_300 text-lg md:text-3xl font-semibold text-center">
          I have got just what you need.
          <span className="underline decoration-accentColor/50">
            Let&apos;s Talk
          </span>
        </h4>
        <div className="space-y-5 flex flex-col items-start mx-auto">
          <div className="flex items-center space-x-3 justify-center">
            <PhoneIcon className="text-accentColor h-7 w-7 animate-pulse" />
            <p className="dark:text-gray_300 text-md md:text-xl">
              +91-9701256071
            </p>
          </div>
          <div className="flex items-center space-x-3 justify-center">
            <MapPinIcon className="text-accentColor h-7 w-7 animate-pulse" />
            <p className="dark:text-gray_300 text-md md:text-xl">
              Hyderabad, Telangana, India
            </p>
          </div>
          <div className="flex items-center space-x-3 justify-center">
            <EnvelopeIcon className="text-accentColor h-7 w-7 animate-pulse" />
            <p className="dark:text-gray_300 text-md md:text-xl">
              sharathnair9999@gmail.com
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 mx-auto max-w-sm"
        >
          <div className="flex gap-2 flex-wrap sm:flex-nowrap ">
            <input
              {...register("name")}
              placeholder="Name"
              className="contact-input w-full"
              type="text"
            />
            <input
              placeholder="Email"
              {...register("email")}
              className="contact-input w-full"
              type="text"
            />
          </div>
          <input
            placeholder="Subject"
            {...register("subject")}
            className="contact-input"
            type="text"
          />
          <textarea
            placeholder="Message"
            {...register("message")}
            className="contact-input"
          ></textarea>
          <button className="bg-blue_900/90 transition-all hover:bg-blue_900 text-gray_100 rounded-md font-bold py-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
