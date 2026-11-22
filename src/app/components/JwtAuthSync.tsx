'use client';

import { useJwtAuthSync } from '@/lib/action/jwtAuth';

// Root layout e thake - session er sathe JWT token sync kore
// Kono UI dekhay na (null return), shudhu side effect:
// login hole token naoy, logout hole token clear
export function JwtAuthSync() {
  useJwtAuthSync();
  return null;
}

export default JwtAuthSync;
