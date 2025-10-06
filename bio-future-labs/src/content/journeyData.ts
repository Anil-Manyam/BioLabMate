export type JourneyItem = {
  title: string;
  description: string;
  tags?: string[];
  icon?: string; // lucide icon name
};

export type JourneyYear = {
  year: number;
  items: JourneyItem[];
};

export const journeyData: JourneyYear[] = [
  {
    year: 2023,
    items: [
      {
        title: "National Recognition and Early Momentum — Ocean Climate Challenge (National Winner 2023)",
        description:
          "BioLabMate began its journey with a strong start, being named the Ocean Climate Challenge National Winner 2023, a recognition that celebrated our innovation in replacing single-use petro-plastics with seaweed-derived bioplastics for laboratories.",
        tags: ["Award", "Bioplastics", "Climate"],
        icon: "Trophy"
      },
      {
        title: "Foresight Canada — National CleanTech Accelerator",
        description:
          "To accelerate our growth, BioLabMate joined the National CleanTech Accelerator under Foresight Canada, gaining access to expert mentorship, industry connections, and commercialization resources.",
        tags: ["Acceleration", "Mentorship"],
        icon: "Rocket"
      }
    ]
  },
  {
    year: 2024,
    items: [
      {
        title: "econext — CleanTech Innovation Award",
        description:
          "In 2024, our innovation was once again recognized when BioLabMate won the CleanTech Innovation Award from econext. This reinforced our leadership in sustainable materials and circular economy solutions.",
        tags: ["Award", "Sustainability"],
        icon: "Trophy"
      },
      {
        title: "RBC Spring Program — Top 15 of 75+",
        description:
          "We also participated in the RBC Spring Program, ranking 15th out of over 75 applications, which provided valuable exposure and strategic business guidance.",
        tags: ["Program", "Strategy"],
        icon: "ShieldCheck"
      }
    ]
  },
  {
    year: 2025,
    items: [
      {
        title: "Blue BioValue — International Blue-Tech Accelerator",
        description:
          "BioLabMate was selected for the International Blue-Tech Accelerator – Blue BioValue, connecting us with global networks in ocean-based innovation.",
        tags: ["Global", "Accelerator"],
        icon: "Globe"
      },
      {
        title: "Parliament of Canada — Standing Committee on Science & Research (SRSR)",
        description:
          "We were also invited as a witness to the Standing Committee on Science and Research (SRSR) at the Canadian Parliament, contributing our perspective on innovation, science, and research in recycling plastics.",
        tags: ["Policy", "Innovation"],
        icon: "Landmark"
      }
    ]
  }
];

