import { Elevator } from "@lucasmarkes/hairline/react";
import { Briefcase } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Timeline from "@/components/Timeline";

const JOBS = [
  {
    when: "2024 – Present",
    role: "Software Engineering Intern",
    org: "Pathao Courier",
    text: "Optimizing logistics algorithms and improving the efficiency of courier tracking systems.",
  },
  {
    when: "2022 – 2023",
    role: "Junior Frontend Developer",
    org: "CodeStack",
    text: "Built and optimized responsive, interactive user interfaces.",
  },
  {
    when: "2021 – 2022",
    role: "Course Instructor",
    org: "ICT School",
    text: "Taught programming basics with hands-on guidance and real-world examples.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section bg-tint border-y border-line">
      <div className="wrap grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <div className="glow">
          <SectionHead
            eyebrow="Experience"
            title="Where I've worked."
            sub="Climbing one floor at a time."
          />
          <div className="mt-10">
            <Timeline items={JOBS} Icon={Briefcase} />
          </div>
        </div>
        <Reveal className="fig fig-tint mx-auto w-full max-w-[460px]">
          <Elevator
            intensity={0.6}
            label="Four floors beside an open shaft. The pointer's height picks a floor."
          />
        </Reveal>
      </div>
    </section>
  );
}
