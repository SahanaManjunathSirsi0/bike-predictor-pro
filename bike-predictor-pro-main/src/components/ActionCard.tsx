import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  delay?: number;
}

const ActionCard = ({ title, description, icon: Icon, href, delay = 0 }: ActionCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-card rounded-xl p-8 shadow-card border border-border/50 hover:shadow-hover hover:border-primary/30 transition-all duration-300 group animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col h-full">
        <div className="gradient-primary w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        
        <Button 
          variant="hero" 
          className="w-full"
          onClick={() => navigate(href)}
        >
          Start Analysis
        </Button>
      </div>
    </div>
  );
};

export default ActionCard;
