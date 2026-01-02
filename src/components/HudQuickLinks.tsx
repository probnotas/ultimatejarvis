import { FileText, Video, Download, Music, Image, Settings } from "lucide-react";

const links = [
  { icon: FileText, label: "Documents" },
  { icon: Video, label: "Videos" },
  { icon: Download, label: "Downloads" },
  { icon: Music, label: "Music" },
  { icon: Image, label: "Images" },
  { icon: Settings, label: "Programs" },
];

export function HudQuickLinks() {
  return (
    <div className="space-y-2">
      {links.map(({ icon: Icon, label }) => (
        <div 
          key={label}
          className="flex items-center gap-2 text-[11px] font-mono text-primary/70 hover:text-primary transition-colors cursor-pointer group"
        >
          <Icon className="w-3 h-3" />
          <span className="group-hover:translate-x-0.5 transition-transform">{label}</span>
        </div>
      ))}
    </div>
  );
}
