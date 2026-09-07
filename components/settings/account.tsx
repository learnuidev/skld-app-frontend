"use client";

import { useEffect, useState } from "react";
import { Info, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge, InfoBox, RowsList, SectionTitle, SettingRow, TextInput } from "@/components/settings/ui";
import { getAuth } from "@/modules/auth";

export default function Account() {
  const [firstName, setFirstName] = useState("Learner");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("learner@peony.app");

  useEffect(() => {
    const id = window.setTimeout(() => {
      const auth = getAuth();
      if (auth) {
        setFirstName(auth.name);
        setEmail(auth.email ?? "learner@peony.app");
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div>
      <SectionTitle>Personal info</SectionTitle>
      <div className="mt-4 space-y-3">
        <div>
          <label className="mb-1.5 block text-sm font-semibold">First name</label>
          <TextInput value={firstName} onChange={setFirstName} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Last name</label>
          <TextInput value={lastName} onChange={setLastName} />
        </div>
        <Button disabled className="w-full py-3" size="lg">
          Update personal info
        </Button>
      </div>

      <div className="mt-10">
        <SectionTitle>Email address</SectionTitle>
        <div className="mt-4">
          <RowsList>
            <SettingRow label={email}>
              <span className="inline-flex items-center gap-1.5">
                <Badge tone="green">Verified</Badge>
                <Badge tone="blue">Primary</Badge>
              </span>
            </SettingRow>
          </RowsList>
          <Button className="mt-3 w-full py-3" size="lg">
            Add another email
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <SectionTitle>Password</SectionTitle>
        <div className="mt-4">
          <InfoBox icon={<Info className="size-4" />}>
            Your account doesn&apos;t have a password set. You sign in using social authentication.
            <br />
            If you&apos;d like to set a password, you can do so from your social connections page.
          </InfoBox>
        </div>
      </div>

      <div className="mt-10">
        <SectionTitle>Add a third party account</SectionTitle>
        <div className="mt-4 space-y-3">
          <RowsList>
            <SettingRow label="Google">
              <Button variant="outline" size="sm" className="rounded-full px-4">
                Connect
              </Button>
            </SettingRow>
            <SettingRow label="Apple">
              <Button variant="outline" size="sm" className="rounded-full px-4">
                Connect
              </Button>
            </SettingRow>
          </RowsList>
        </div>
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="size-4" />
        We&apos;ll only email you about your learning.
      </div>
    </div>
  );
}
