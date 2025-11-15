import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GetPrimeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GetPrimeModal({ open, onOpenChange }: GetPrimeModalProps) {
  const features = [
    "Unlimited AI-powered voice calls",
    "Advanced lead scoring algorithms",
    "Priority customer support",
    "Custom integration webhooks",
    "Advanced analytics & reporting",
    "Team collaboration tools",
    "White-label branding options",
    "API access for automation",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-card via-card to-primary/5" data-testid="modal-get-prime">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Upgrade to PRIME</DialogTitle>
              <Badge className="mt-1 bg-gradient-to-r from-primary to-pink-500 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Limited Time Offer
              </Badge>
            </div>
          </div>
          <DialogDescription>
            Unlock the full potential of LOQUOAIT with premium features designed for high-performance teams.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pricing */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-pink-500/10 border border-primary/20">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground">Billed monthly • Cancel anytime</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-prime">
            Maybe Later
          </Button>
          <Button 
            className="bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90"
            data-testid="button-upgrade-prime"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
