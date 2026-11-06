import { describe, expect, it } from "vitest";

import { CRC, PHONE_LABEL, PHONE_TEL, WA } from "@/lib/contact";

describe("Contato da MK Contabilidade", () => {
  it("abre o WhatsApp no número (21) 97367-8068", () => {
    expect(WA).toBe("https://wa.me/5521973678068?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20contador.");
  });

  it("usa o mesmo número no link de telefone do rodapé", () => {
    expect(PHONE_TEL).toBe("tel:+5521973678068");
    expect(PHONE_LABEL).toBe("(21) 97367-8068");
  });

  it("mostra apenas o CRC RJ-140722/0 no rodapé", () => {
    expect(CRC).toBe("CRC RJ-140722/0");
  });
});
