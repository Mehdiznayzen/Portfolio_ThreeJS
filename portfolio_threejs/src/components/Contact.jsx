import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
    position: "bottom-right",
    autoClose : 8000,
    pauseOnHover : true,
    draggable : true,
    theme : 'dark'
}


const Contact = () => {
  const formRef = useRef()
  const [form, setForm] = useState({
    name : '',
    email : '',
    message : ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name] : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID, 
        {
          from_name : form.name,
          to_name : "Mehdi",
          from_email : form.email,
          to_email : 'mehdiznayzen@gmail.com',
          message : form.message
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false)
        toast.success("Thank you. I will get back to you as soon as possible.", toastOptions)
        setForm({
          name: "",
          email: "",
          message: ""
        })
      },
      (error) => {
        setLoading(false)
        console.error(error);

        toast.error("Ahh, something went wrong. Please try again.", toastOptions)
      }
    )

  }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 rounded-2xl p-8"
      >
        <p className={`${styles.sectionSubText}`}>Get In Touch</p>
        <h3 className={`${styles.sectionHeadText}`}>Contact.</h3>
        <form 
          action="" 
          ref={formRef} 
          onSubmit={handleSubmit}
          className="flex-col flex gap-8 mt-12"
        >
          <label htmlFor="" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your name : </span>
            <input 
              name="name"
              type="text" 
              value={form.name} 
              onChange={handleChange} 
              placeholder="What's your name ?" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-meduim" 
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email : </span>
            <input 
              name="email"
              type="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="What's your email ?" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-meduim" 
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your name : </span>
            <textarea
              rows={7}
              name="message"
              value={form.message} 
              onChange={handleChange} 
              placeholder="What's do you want to say ?" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-meduim" 
            />
          </label>
          <button type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit rounded-xl cursor-pointer text-white font-bold shadow-md shadow-primary"
          >
            {
              loading ? 'Sending...' : 'Send'
            }
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas/>
      </motion.div>
      <ToastContainer />
    </div>
  )
}

export default SectionWrapper(Contact, "contact")