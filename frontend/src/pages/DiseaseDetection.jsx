import DashboardLayout from "../layouts/DashboardLayout";

import { useState } from "react";

import { motion } from "framer-motion";

import {
  FiImage,
  FiX,
} from "react-icons/fi";

import ReactMarkdown from "react-markdown";

import toast from "react-hot-toast";

function DiseaseDetection() {

  // ================= USER =================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const userEmail =
    user?.email;

  // ================= STATES =================

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [imageFile, setImageFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState("");

  // ================= IMAGE UPLOAD =================

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      const imageUrl =
        URL.createObjectURL(file);

      setSelectedImage(imageUrl);

      setImageFile(file);

    }

  };

  // ================= REMOVE IMAGE =================

  const removeImage = () => {

    if (selectedImage) {

      URL.revokeObjectURL(
        selectedImage
      );

    }

    setSelectedImage(null);

    setImageFile(null);

    setResult("");

  };

  // ================= ANALYZE IMAGE =================

  const analyzeDisease = async () => {

    if (!imageFile) {

      toast.error(
        "Please upload an image"
      );

      return;

    }

    setLoading(true);

    setResult("");

    try {

      // ===============================
      // CHAT ID
      // ===============================

      const chatId =
        crypto.randomUUID();

      // ===============================
      // FORM DATA
      // ===============================

      const formData =
        new FormData();

      formData.append(
        "image",
        imageFile
      );

      formData.append(
        "message",
        "disease analysis"
      );

      formData.append(
        "chat_id",
        chatId
      );

      formData.append(
        "user_email",
        userEmail
      );

      // ===============================
      // API REQUEST
      // ===============================

      const response = await fetch(

        "https://agromind-ai-q13r.onrender.com/chat",

        {
          method: "POST",
          body: formData,
        }

      );

      const data =
        await response.json();

      setResult(data.reply);

      toast.success(
        "Analysis Complete 🌱"
      );

    } catch (error) {

      console.error(error);

      setResult(
        "⚠️ Failed to analyze crop disease."
      );

      toast.error(
        "Backend connection failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout>

      <div
        className="
          p-6
          md:p-10
          overflow-x-hidden
        "
      >

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <h1
            className="
              text-4xl
              md:text-5xl
              font-black
              mb-3
            "
          >

            🌾 AI Crop Disease Detection

          </h1>

          <p className="text-gray-400 mb-10">

            Upload a crop image and let
            AgroMind AI analyze diseases,
            symptoms, treatment,
            and prevention tips.

          </p>

        </motion.div>

        {/* MAIN GRID */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-10
          "
        >

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            {/* UPLOAD */}

            <label
              className="
                border-2
                border-dashed
                border-green-500/40
                rounded-3xl
                p-10
                flex
                flex-col
                items-center
                justify-center
                text-center
                cursor-pointer
                hover:border-green-400
                transition
                bg-black/20
              "
            >

              <FiImage
                size={70}
                className="
                  text-green-400
                  mb-5
                "
              />

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-3
                "
              >

                Upload Crop Image

              </h2>

              <p className="text-gray-400">

                Click here to upload
                crop or leaf image

              </p>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleImageUpload
                }
              />

            </label>

            {/* PREVIEW */}

            {selectedImage && (

              <div className="mt-8 relative">

                <img
                  src={selectedImage}
                  alt="preview"
                  className="
                    w-full
                    rounded-3xl
                    border
                    border-white/10
                    max-h-[500px]
                    object-cover
                  "
                />

                <button
                  onClick={removeImage}
                  className="
                    absolute
                    top-4
                    right-4
                    bg-red-500
                    hover:bg-red-400
                    p-3
                    rounded-full
                    transition
                    text-xl
                  "
                >

                  <FiX />

                </button>

              </div>

            )}

            {/* ANALYZE */}

            {selectedImage && (

              <button
                onClick={analyzeDisease}
                disabled={loading}
                className="
                  mt-8
                  w-full
                  bg-green-500
                  hover:bg-green-400
                  disabled:opacity-50
                  text-black
                  font-bold
                  py-5
                  rounded-2xl
                  transition
                  text-lg
                "
              >

                🌱 Analyze Crop Disease

              </button>

            )}

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
              min-h-[500px]
            "
          >

            <h2
              className="
                text-3xl
                font-black
                mb-6
              "
            >

              🤖 AI Analysis Result

            </h2>

            {/* LOADING */}

            {loading && (

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mt-10
                "
              >

                <div
                  className="
                    w-4
                    h-4
                    rounded-full
                    bg-green-400
                    animate-bounce
                  "
                />

                <div
                  className="
                    w-4
                    h-4
                    rounded-full
                    bg-green-400
                    animate-bounce
                    [animation-delay:0.2s]
                  "
                />

                <div
                  className="
                    w-4
                    h-4
                    rounded-full
                    bg-green-400
                    animate-bounce
                    [animation-delay:0.4s]
                  "
                />

                <p className="ml-3 text-gray-300">

                  AgroMind AI is analyzing
                  crop disease...

                </p>

              </div>

            )}

            {/* EMPTY */}

            {!loading && !result && (

              <div
                className="
                  h-full
                  flex
                  items-center
                  justify-center
                  text-center
                  text-gray-500
                  mt-20
                "
              >

                Upload a crop image to see
                AI disease analysis 🌱

              </div>

            )}

            {/* RESULT */}

            {!loading && result && (

              <div
                className="
                  prose
                  prose-invert
                  max-w-none
                  break-words
                "
              >

                <ReactMarkdown>

                  {result}

                </ReactMarkdown>

              </div>

            )}

          </motion.div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default DiseaseDetection;