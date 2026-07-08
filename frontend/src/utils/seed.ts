import type { Visitor } from '../types';

const STORAGE_KEY = 'vms-visitors';

function formatDate(d: Date) {
  return d.toISOString().split('T')[0];
}

function randomFrom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function seedVisitorsIfEmpty(count = 30) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(existing)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }

    const firstNames = ['Alex', 'Sam', 'Jamie', 'Taylor', 'Jordan', 'Morgan', 'Casey', 'Riley', 'Avery', 'Parker'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Lee', 'Garcia', 'Martinez', 'Davis', 'Wilson', 'Anderson', 'Thomas'];
    const purposes = ['Meeting', 'Delivery', 'Interview', 'Maintenance', 'Consultation', 'Visit', 'Workshop', 'Inspection'];
    const hosts = ['Alice', 'Bob', 'Charlie', 'Dana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    const statuses: Visitor['status'][] = ['pending', 'approved', 'rejected'];

    const now = Date.now();
    const visitors = Array.isArray(existing) ? [...existing] : [];
    const existingCount = visitors.length;
    const missingCount = Math.max(0, count - existingCount);

    function makeRandomTenDigit() {
      const starters = ['9', '8', '7', '6'];
      const first = starters[Math.floor(Math.random() * starters.length)];
      let rest = '';
      for (let i = 0; i < 9; i++) rest += String(Math.floor(Math.random() * 10));
      return first + rest;
    }

    function normalizePhone(raw?: string) {
      const digits = (raw ?? '').replace(/\D/g, '');
      if (digits.length >= 10) return `+91${digits.slice(-10)}`;
      return `+91${makeRandomTenDigit()}`;
    }

    // Normalize any existing visitor phones to +91XXXXXXXXXX
    for (let i = 0; i < visitors.length; i++) {
      try {
        visitors[i].phone = normalizePhone(visitors[i].phone as unknown as string);
      } catch {
        visitors[i].phone = normalizePhone('');
      }
    }

    for (let i = 0; i < missingCount; i++) {
      const offset = Math.floor(Math.random() * (45 + 30)) - 45; // -45 .. +29
      const date = new Date(now + offset * 86400000);
      const visit_date = formatDate(date);

      const status = randomFrom(statuses);
      const name = `${randomFrom(firstNames)} ${randomFrom(lastNames)}`;
      const visitor: Visitor = {
        id: (crypto && (crypto as any).randomUUID ? (crypto as any).randomUUID() : String(Date.now() + i)),
        name,
        phone: normalizePhone(makeRandomTenDigit()),
        purpose: randomFrom(purposes),
        visit_date,
        status,
        host_name: randomFrom(hosts),
        notes: '',
        created_at: new Date(now - Math.floor(Math.random() * 30) * 86400000).toISOString(),
        updated_at: new Date(now - Math.floor(Math.random() * 10) * 86400000).toISOString(),
      };
      visitors.push(visitor);
    }

    visitors.sort((a, b) => (a.visit_date < b.visit_date ? 1 : -1));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitors));
  } catch (e) {
    // ignore seeding errors
    // console.warn('seeding failed', e);
  }
}

export default seedVisitorsIfEmpty;
