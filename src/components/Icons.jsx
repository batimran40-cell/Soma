import React from 'react'
export default function Icon({ name, size=22, ...props }) {
 const common={width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true,...props}
 const paths={
 menu:<><path d="M4 7h16M4 12h16M4 17h16"/></>,
 user:<><circle cx="12" cy="8" r="3.5"/><path d="M5.5 20v-1.5a6.5 6.5 0 0 1 13 0V20"/></>,
 search:<><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
 bag:<><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
 close:<><path d="M5 5 19 19M19 5 5 19"/></>,
 arrow:<><path d="M4 12h15m-6-6 6 6-6 6"/></>,
 leaf:<><path d="M20 4C9 4 4 10 4 16a5 5 0 0 0 5 5c7 0 12-6 11-17Z"/><path d="M6 19c4-4 8-7 12-10"/></>,
 heart:<><path d="M20.8 8.5c0 4.4-8.8 11-8.8 11s-8.8-6.6-8.8-11a5 5 0 0 1 8.8-3.2 5 5 0 0 1 8.8 3.2Z"/></>,
 sun:<><circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></>,
 sprout:<><path d="M12 22V10"/><path d="M12 14c-6 0-9-3-9-9 6 0 9 3 9 9ZM12 17c6 0 9-3 9-9-6 0-9 3-9 9Z"/></>,
 instagram:<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
 sparkle:<><path d="m12 2 2.1 7.9L22 12l-7.9 2.1L12 22l-2.1-7.9L2 12l7.9-2.1L12 2Z"/></>,
 };
 return <svg {...common}>{paths[name]??paths.leaf}</svg>
}
