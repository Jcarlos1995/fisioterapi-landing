/**
 * Tests de configuración y URLs del landing.
 * Solo lógica pura — sin Firebase ni DOM.
 */

import { BOOKING_URL, PORTAL_URL, PATIENT_PORTAL_URL } from '../config';

describe('URLs de configuración', () => {
  it('BOOKING_URL apunta al sistema correcto', () => {
    expect(BOOKING_URL).toContain('sistema.fisioterapichepen.com');
    expect(BOOKING_URL).toContain('#/agendar');
  });

  it('PORTAL_URL apunta al portal de pacientes', () => {
    expect(PORTAL_URL).toContain('sistema.fisioterapichepen.com');
  });

  it('PATIENT_PORTAL_URL incluye el hash del portal', () => {
    expect(PATIENT_PORTAL_URL).toContain('#/portal');
  });

  it('todas las URLs usan HTTPS', () => {
    [BOOKING_URL, PORTAL_URL, PATIENT_PORTAL_URL].forEach(url => {
      expect(url.startsWith('https://')).toBe(true);
    });
  });
});
