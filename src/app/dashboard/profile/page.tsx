"use client";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/provider/auth-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Shield, Edit3, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// TODO: PATCH /api/user/profile to update user info

export default function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  const handleSave = async () => {
    // TODO: PATCH /api/user/profile { name }
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-10">
      <div className="border-b border-border pb-8">
        <div className="flex items-center gap-3 mb-3">
          <User className="h-3 w-3 text-primary" />
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">
            Account Settings
          </span>
        </div>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.85]">
          My <span className="text-primary">Profile.</span>
        </h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="flex items-center gap-6 border border-border bg-card/20 p-6">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-primary/30 bg-primary/5">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
          )}
          </div>
          <div className="flex-1">
            <p className="text-xl font-black uppercase italic tracking-tighter text-foreground">
              {user?.name || "Loading..."}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {user?.email}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Badge
                variant={user?.role === "ADMIN" ? "default" : "secondary"}
                className="rounded-none text-[9px] font-black uppercase tracking-widest"
              >
                <Shield className="mr-1 h-2.5 w-2.5" />
                {user?.role || "USER"}
              </Badge>
            </div>
          </div>

          {!editing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditing(true)}
              className="gap-2 rounded-none text-[9px] font-black uppercase tracking-widest"
            >
              <Edit3 className="h-3.5 w-3.5" /> Edit
            </Button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          {[
            { label: "Role", value: user?.role || "USER" },
            { label: "Content Access", value: user?.contentStatus || "FREE" },
            { label: "Profile State", value: editing ? "Editing" : "Ready" },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-border bg-card/20 p-5"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-3 text-2xl font-black italic tracking-tight text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Success message */}
      {saved && (
        <div className="flex items-center gap-3 p-4 border border-green-500/30 bg-green-500/10 text-green-600">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Profile updated successfully.
          </span>
        </div>
      )}

      {/* Edit Form */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">
          Account Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              Full Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editing}
              className="rounded-none border-border bg-background text-sm font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              Email Address
            </Label>
            <div className="relative">
              <Input
                value={email}
                disabled
                className="rounded-none border-border bg-muted/30 text-sm font-medium pr-10"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
              Email cannot be changed. Contact support.
            </p>
          </div>
        </div>

        <Separator className="bg-border" />

        <div className="space-y-2">
          <Label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
            Account Type
          </Label>
          <Input
            value={user?.role === "ADMIN" ? "Administrator" : "Standard Member"}
            disabled
            className="rounded-none border-border bg-muted/30 text-sm font-medium max-w-xs"
          />
        </div>

        {editing && (
          <div className="flex items-center gap-4 pt-4">
            <Button
              onClick={handleSave}
              className="rounded-none bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-8 h-11 hover:opacity-90"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEditing(false);
                setName(user?.name || "");
              }}
              className="rounded-none text-[10px] font-black uppercase tracking-widest px-8 h-11"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="p-6 border border-destructive/20 bg-destructive/5 space-y-4">
        <div className="absolute top-0 left-0 h-0.5 w-full bg-destructive" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-destructive">
          Danger Zone
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Deleting your account is permanent and cannot be undone. All reviews,
          watchlist items, and purchase history will be removed.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="rounded-none border-destructive/40 text-destructive text-[9px] font-black uppercase tracking-widest hover:bg-destructive hover:text-white"
        >
          {/* TODO: POST /api/user/delete-account */}
          Delete Account
        </Button>
      </div>
    </div>
  );
}
