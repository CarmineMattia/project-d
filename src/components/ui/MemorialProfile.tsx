/** @format */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  HeartIcon,
  UsersIcon,
  ImageIcon,
  MessageSquareIcon,
  VideoIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "lucide-react";
import "../../i18n";

interface Profile {
  name?: string;
  birthDate?: string;
  deathDate?: string;
  biography?: string;
  interests?: string[];
  family?: string[];
}

interface Comment {
  name: string;
  message: string;
  timestamp: number;
}

interface MemorialProfileProps {
  profile?: Profile;
}

export default function MemorialProfile({
  profile = {
    name: "Tienno Pattacini",
    birthDate: "1904-03-24",
    deathDate: "1989-09-30",
    biography:
      'Tienno Pattacini was a renowned Italian accordionist, composer, and orchestra conductor. Born in Castelnovo ne\' Monti, he became famous for his virtuosity with the accordion and his contributions to the development of folk music, particularly the "liscio" genre. Pattacini founded his own orchestra in 1940 and composed numerous pieces that became classics of the genre. His legacy continues to influence Italian folk music to this day.',
    interests: ["Accordion", "Composing", "Conducting", "Folk Music"],
    family: [
      "Spouse: Information not available",
      "Children: Information not available",
    ],
  },
}: MemorialProfileProps) {
  const { t, i18n } = useTranslation();
  const [fontSize, setFontSize] = useState("base");
  const [darkMode, setDarkMode] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ name: "", message: "" });
  const [showNewComment, setShowNewComment] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: "https://www.vailiscio.it/wp-content/uploads/2023/05/tienno-pattacini-sax.jpg",
      alt: t("photoAlt.saxophone"),
    },
    {
      src: "https://i.ytimg.com/vi/TpTXBrSoMyc/maxresdefault.jpg",
      alt: t("photoAlt.performance"),
    },
    {
      src: "https://www.officinadelbattagliero.com/wp-content/uploads/2016/02/pataccini-1.jpg",
      alt: t("photoAlt.portrait"),
    },
    {
      src: "https://www.officinadelbattagliero.com/wp-content/uploads/2016/02/gallery_album01.jpg",
      alt: t("photoAlt.albumCover"),
    },
  ];

  const fontSizes: { [key: string]: string } = {
    base: "text-base",
    large: "text-lg",
    xl: "text-xl",
  };

  useEffect(() => {
    if (showNewComment) {
      const timer = setTimeout(() => setShowNewComment(false), 500);
      return () => clearTimeout(timer);
    }
  }, [showNewComment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name && newComment.message) {
      const updatedComments = [
        ...comments,
        { ...newComment, timestamp: Date.now() },
      ];
      setComments(updatedComments);
      setNewComment({ name: "", message: "" });
      setShowNewComment(true);
      playSound();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const playSound = () => {
    const audio = new Audio("/comment-sound.mp3");
    audio.play();
  };

  const changeLanguage = () => {
    const newLang = i18n.language === "en" ? "it" : "en";
    i18n.changeLanguage(newLang);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-stone-100 text-stone-800"
      }`}
    >
      <header className={`${darkMode ? "bg-gray-800" : "bg-stone-200"} p-4 flex flex-wrap justify-between items-center`}>
        <h1 className={`${fontSizes[fontSize]} font-semibold mb-2 sm:mb-0`}>
          {t("memorialProfile")}
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() =>
              setFontSize((prev) =>
                prev === "base" ? "large" : prev === "large" ? "xl" : "base"
              )
            }
          >
            {t("fontSizeButton", {
              size: fontSize === "xl" ? "+" : fontSize === "large" ? "±" : "-",
            })}
          </Button>
          <Button
            variant="outline"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Button variant="outline" onClick={changeLanguage}>
            {i18n.language === "en" ? "🇮🇹 Italiano" : "🇬🇧 English"}
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-8">
        <Card className={darkMode ? "bg-gray-800" : ""}>
          <CardContent className="flex flex-col md:flex-row gap-8 items-center p-6">
            <Image
              src="https://www.vailiscio.it/wp-content/uploads/2023/05/tienno-pattacini-1.jpg"
              alt={profile.name || "Profile Image"}
              width={200}
              height={200}
              className="rounded-full object-cover w-48 h-48 md:w-64 md:h-64"
            />
            <div className="text-center md:text-left">
              <h2 className={`${fontSizes[fontSize]} font-bold mb-2`}>
                {profile.name}
              </h2>
              <p className={`${fontSizes[fontSize]} ${darkMode ? "text-gray-300" : "text-stone-600"}`}>
                <CalendarIcon className="inline mr-2" />
                {formatDate(profile.birthDate || "")} - {formatDate(profile.deathDate || "")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className={darkMode ? "bg-gray-800" : ""}>
          <CardHeader>
            <CardTitle className={`${fontSizes[fontSize]}`}>
              {t("biography")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`${fontSizes[fontSize]}`}>{profile.biography}</p>
          </CardContent>
        </Card>

        <Card className={darkMode ? "bg-gray-800" : ""}>
          <CardHeader>
            <CardTitle className={`${fontSizes[fontSize]}`}>
              <HeartIcon className="inline mr-2" />
              {t("personalInterests")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={`${fontSizes[fontSize]} list-disc list-inside`}>
              {profile.interests?.map((interest, index) => (
                <li key={index}>{t(`interests.${interest}`)}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className={darkMode ? "bg-gray-800" : ""}>
          <CardHeader>
            <CardTitle className={`${fontSizes[fontSize]}`}>
              <UsersIcon className="inline mr-2" />
              {t("familyConnections")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={`${fontSizes[fontSize]}`}>
              {profile.family?.map((member, index) => (
                <li key={index}>{t(`family.${index}`)}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className={darkMode ? "bg-gray-800" : ""}>
          <CardHeader>
            <CardTitle className={`${fontSizes[fontSize]}`}>
              <ImageIcon className="inline mr-2" />
              {t("photoGallery")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative w-full pt-[100%]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg cursor-pointer transition-transform hover:scale-105 absolute inset-0"
                    onClick={() => setSelectedImage(image.src)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={darkMode ? "bg-gray-800" : ""}>
          <CardHeader>
            <CardTitle className={`${fontSizes[fontSize]}`}>
              <VideoIcon className="inline mr-2" />
              {t("videoGallery")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/x3opvff_-HU"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        <Card className={darkMode ? "bg-gray-800" : ""}>
          <CardHeader>
            <CardTitle className={`${fontSizes[fontSize]}`}>
              <MessageSquareIcon className="inline mr-2" />
              {t("leaveMemory")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder={t("yourName")}
                className={`${fontSizes[fontSize]} ${darkMode ? "bg-gray-700 text-gray-100" : ""}`}
                value={newComment.name}
                onChange={(e) =>
                  setNewComment({ ...newComment, name: e.target.value })
                }
              />
              <Textarea
                placeholder={t("shareMemory")}
                className={`${fontSizes[fontSize]} ${darkMode ? "bg-gray-700 text-gray-100" : ""}`}
                value={newComment.message}
                onChange={(e) =>
                  setNewComment({ ...newComment, message: e.target.value })
                }
                onKeyPress={handleKeyPress}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewComment({ name: "", message: "" })}
                  className={`${fontSizes[fontSize]}`}
                >
                  {t("cancel")}
                </Button>
                <Button type="submit" className={`${fontSizes[fontSize]}`}>
                  {t("comment")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className={darkMode ? "bg-gray-800" : ""}>
          <CardHeader>
            <CardTitle className={`${fontSizes[fontSize]}`}>
              <MessageSquareIcon className="inline mr-2" />
              {t("memories")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {comments.map((comment, index) => (
                <li
                  key={comment.timestamp}
                  className={`${
                    fontSizes[fontSize]
                  } p-4 ${darkMode ? "bg-gray-700" : "bg-stone-200"} rounded-lg transition-all duration-500 ${
                    showNewComment && index === comments.length - 1
                      ? "animate-fade-in"
                      : ""
                  }`}
                >
                  <p className="font-semibold">{comment.name}</p>
                  <p>{comment.message}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>

      <footer className={`${darkMode ? "bg-gray-800" : "bg-stone-200"} p-4 mt-8 text-center`}>
        <p className={`${fontSizes[fontSize]} ${darkMode ? "text-gray-300" : "text-stone-600"}`}>
          {t("footer", { name: profile.name })}
        </p>
      </footer>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage}
              alt="Zoomed image"
              layout="intrinsic"
              width={800}
              height={600}
              objectFit="contain"
            />
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <XIcon size={24} />
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
