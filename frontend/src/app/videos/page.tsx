"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Video, Play, Search, Clock, ExternalLink, X, Eye } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

interface VideoItem {
  id: string;
  youtube_id: string;
  title: string;
  title_hi?: string;
  channel: string;
  category: string;
  category_en?: string;
  duration: string;
  description: string;
  description_en?: string;
  views?: string;
  source?: string;
}

const FALLBACK_VIDEOS: VideoItem[] = [
  {
    id: "vid-01",
    youtube_id: "8P2_N7eZ3uQ",
    title: "Super Seeder Operation & Direct Wheat Sowing in Residue",
    title_hi: "सुपर सीडर से पराली में गेहूँ की सीधी बुवाई विधि एवं मशीन सेटिंग",
    channel: "NDUAT Extension Media Cell",
    category: "कृषि यंत्रीकरण",
    category_en: "Farm Machinery",
    duration: "12:45",
    description: "पराली प्रबंधन के साथ गेहूँ की सटीक बुवाई, बीज व खाद का समायोजन और मशीन की सेटिंग।",
    description_en: "Scientific demonstration of operating super seeders for direct wheat sowing after paddy harvest without straw burning.",
    views: "48.5K",
    source: "NDUAT Media Cell",
  },
  {
    id: "vid-02",
    youtube_id: "V2jHq1yM5XQ",
    title: "Paddy Stem Borer Biological Management & Pheromone Traps",
    title_hi: "धान की फसल में तना छेदक कीट की पहचान व जैविक नियंत्रण (फेरोमोन ट्रैप)",
    channel: "KVK NDUAT Extension Cell",
    category: "कीट नियंत्रण",
    category_en: "Pest Control",
    duration: "08:30",
    description: "खेत में फेरोमोन ट्रैप व ट्राइकोग्रामा कार्ड लगाने की प्रयोगात्मक विधि।",
    description_en: "Practical demonstration of installing pheromone traps and trichogramma cards in paddy fields.",
    views: "32.1K",
    source: "केवीके प्रसार प्रकोष्ठ",
  },
  {
    id: "vid-03",
    youtube_id: "N7jL4r3Z8q0",
    title: "Natural Farming: Scientific Preparation of Jeevamrit",
    title_hi: "प्राकृतिक खेती: जीवामृत और घनजीवामृत बनाने की वैज्ञानिक विधि",
    channel: "NDUAT Natural Farming Cell",
    category: "प्राकृतिक खेती",
    category_en: "Natural Farming",
    duration: "15:20",
    description: "देशी गाय का गोबर, गोमूत्र, बेसन, गुड़ एवं सजीव मिट्टी से 48 घंटे में जीवामृत तैयार करना।",
    description_en: "Standard 48-hour preparation of microbial Jeevamrit from indigenous cattle dung and urine.",
    views: "64.2K",
    source: "NDUAT प्राकृतिक खेती संभाग",
  },
  {
    id: "vid-04",
    youtube_id: "K3wL8m5P9xY",
    title: "Soil Sampling 5-Step Protocol & Testing Demo",
    title_hi: "मृदा नमूना एकत्र करने की सही 5-चरणीय वैज्ञानिक विधि",
    channel: "Soil Science Division, NDUAT",
    category: "मृदा स्वास्थ्य",
    category_en: "Soil Health",
    duration: "06:15",
    description: "खेत में 'V' आकार का गड्ढा बनाकर मिट्टी का सही सम्मिश्रण एवं प्रयोगशाला पैकिंग।",
    description_en: "V-shaped soil sampling method, composite mixing, and soil health card laboratory packing.",
    views: "28.7K",
    source: "मृदा परीक्षण संभाग, NDUAT",
  },
  {
    id: "vid-05",
    youtube_id: "8P2_N7eZ3uQ",
    title: "Drip & Sprinkler Micro-Irrigation Maintenance",
    title_hi: "ड्रिप एवं स्प्रिंकलर सूक्ष्म सिंचाई प्रणाली की स्थापना व रखरखाव",
    channel: "Department of Soil & Water Engineering, MCAET",
    category: "कृषि यंत्रीकरण",
    category_en: "Farm Machinery",
    duration: "14:10",
    description: "ड्रिप लेटरल पाइपों की एसिड ट्रीटमेंट से सफाई, फिल्टर वॉशिंग और 90% तक जल बचत।",
    description_en: "Acid treatment and backwashing maintenance for drip irrigation systems.",
    views: "19.4K",
    source: "MCAET / NDUAT",
  },
  {
    id: "vid-06",
    youtube_id: "V2jHq1yM5XQ",
    title: "Mustard Aphid & White Rust Timely Identification",
    title_hi: "सरसों में माहू कीट एवं सफेद रतुआ (छाछिया) की समय पर रोकथाम",
    channel: "Plant Pathology Department, NDUAT",
    category: "कीट नियंत्रण",
    category_en: "Pest Control",
    duration: "10:05",
    description: "सरसों में फूल आते समय माहू का प्रकोप और सफेद धब्बों की सही पहचान व रासायनिक-जैविक स्प्रे।",
    description_en: "Timely diagnosis and IPM spray recommendations for mustard aphids and white rust.",
    views: "41.8K",
    source: "पादप रोग संभाग, NDUAT",
  },
];

export default function VideosPage() {
  const { lang } = useI18n();
  const [videos, setVideos] = useState<VideoItem[]>(FALLBACK_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/v1/videos")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setVideos(data);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    { id: "all", label_hi: "सभी वीडियो", label_en: "All Categories" },
    { id: "यंत्रीकरण", label_hi: "कृषि यंत्रीकरण", label_en: "Machinery" },
    { id: "कीट", label_hi: "कीट व रोग नियंत्रण", label_en: "Pest & Disease" },
    { id: "प्राकृतिक", label_hi: "प्राकृतिक खेती", label_en: "Natural Farming" },
    { id: "मृदा", label_hi: "मृदा स्वास्थ्य", label_en: "Soil Health" },
  ];

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      const matchCat =
        category === "all" ||
        v.category.toLowerCase().includes(category.toLowerCase()) ||
        v.category_en?.toLowerCase().includes(category.toLowerCase());
      const matchSearch =
        !search ||
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.title_hi?.toLowerCase().includes(search.toLowerCase()) ||
        v.description?.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [videos, category, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "कृषि वीडियो लाइब्रेरी" : "Video Library" }]}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <SectionHeader
            title={lang === "hi" ? "कृषि वैज्ञानिक वीडियो लाइब्रेरी" : "Agricultural Video Library"}
            subtitle={
              lang === "hi"
                ? "एनडीयूएटी वैज्ञानिकों द्वारा फसलों, कृषि यंत्रों, रोग रोकथाम एवं प्राकृतिक खेती पर तैयार सचित्र व्यावहारिक वीडियो"
                : "Practical scientific demonstration videos by NDUAT agronomists on modern farm machinery, IPM, and organic farming"
            }
          />
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="size-4 text-[#9ca3af] absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "hi" ? "वीडियो खोजें..." : "Search videos..."}
            className="w-full pl-9 pr-3 py-2 border border-[#d1d5db] rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#15803d]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              category === c.id
                ? "bg-[#15803d] text-white shadow-xs"
                : "bg-white text-[#4b5563] border border-[#d1d5db] hover:border-[#15803d]"
            }`}
          >
            {lang === "hi" ? c.label_hi : c.label_en}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setSelectedVideo(vid)}
            className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden hover:border-[#15803d] transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail / Header */}
              <div className="h-44 bg-gradient-to-br from-[#14532d] via-[#15803d] to-[#0f2942] flex items-center justify-center relative overflow-hidden">
                <div className="size-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#eab308] group-hover:text-[#14532d] transition-all shadow-lg">
                  <Play className="size-6 fill-current ml-1" />
                </div>
                <span className="absolute bottom-3 right-3 bg-black/75 text-white text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                  <Clock className="size-3" />
                  {vid.duration}
                </span>
                <span className="absolute top-3 left-3 bg-[#15803d] text-white text-[11px] px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                  {lang === "hi" ? vid.category : vid.category_en || vid.category}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-base text-[#14532d] group-hover:text-[#15803d] transition-colors line-clamp-2 leading-snug">
                  {lang === "hi" ? vid.title_hi || vid.title : vid.title}
                </h3>
                <p className="text-xs text-[#6b7280]">
                  {vid.channel}
                </p>
                <p className="text-xs text-[#374151] line-clamp-2 leading-relaxed">
                  {lang === "hi" ? vid.description : vid.description_en || vid.description}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#f8faf5] border-t border-[#e5e7eb] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#6b7280] font-medium flex items-center gap-1">
                <Eye className="size-3" />
                {vid.views || "25K"} {lang === "hi" ? "देखा गया" : "views"}
              </span>
              <span className="font-bold text-[#15803d] group-hover:underline flex items-center gap-1">
                <span>{lang === "hi" ? "वीडियो चलाएं" : "Watch Video"}</span>
                <span>→</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 bg-white rounded-2xl border border-[#e5e7eb] text-center text-xs text-[#6b7280]">
          {lang === "hi" ? "कोई वीडियो नहीं मिला" : "No videos found"}
        </div>
      )}

      {/* YouTube Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20">
            {/* Modal Header */}
            <div className="p-4 bg-[#14532d] text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#86efac] block">
                  {selectedVideo.channel}
                </span>
                <h3 className="font-bold text-sm sm:text-base line-clamp-1">
                  {lang === "hi" ? selectedVideo.title_hi || selectedVideo.title : selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtube_id}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 bg-[#f8faf5] border-t border-[#e5e7eb] text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#14532d]">
                  {lang === "hi" ? selectedVideo.category : selectedVideo.category_en || selectedVideo.category}
                </span>
                <span className="text-[#6b7280]">{selectedVideo.duration} मिनट</span>
              </div>
              <p className="text-[#374151] leading-relaxed">
                {lang === "hi" ? selectedVideo.description : selectedVideo.description_en || selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
