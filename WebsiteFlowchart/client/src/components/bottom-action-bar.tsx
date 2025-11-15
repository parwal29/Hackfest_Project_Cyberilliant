import { Smartphone, Shield, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiWhatsapp } from "react-icons/si";

export function BottomActionBar() {
  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* UPI (BHIM) */}
          <Button
            variant="secondary"
            className="flex items-center justify-start gap-3 h-auto py-3 px-4"
            data-testid="button-upi"
            aria-label="Configure UPI (BHIM) payment gateway"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">UPI (BHIM)</p>
              <p className="text-xs text-muted-foreground">Payment Gateway</p>
            </div>
          </Button>

          {/* Access & Controls */}
          <Button
            variant="secondary"
            className="flex items-center justify-start gap-3 h-auto py-3 px-4"
            data-testid="button-access-controls"
            aria-label="Manage access controls and security settings"
          >
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Access & Controls</p>
              <p className="text-xs text-muted-foreground">Security Settings</p>
            </div>
          </Button>

          {/* WhatsApp Business */}
          <Button
            variant="secondary"
            className="flex items-center justify-start gap-3 h-auto py-3 px-4"
            data-testid="button-whatsapp"
            aria-label="Configure WhatsApp Business messaging integration"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <SiWhatsapp className="w-5 h-5 text-green-500" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">WhatsApp Business</p>
              <p className="text-xs text-muted-foreground">Messaging Integration</p>
            </div>
          </Button>
        </div>

        {/* Overview Dropdown */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <Select defaultValue="overview">
            <SelectTrigger className="w-40" data-testid="select-overview" aria-label="Select view mode">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="analytics">Analytics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
