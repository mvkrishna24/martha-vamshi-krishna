/**
 * Testimonials, in the site's quiet voice — short, specific, no
 * exclamation marks.
 *
 * NOTE(client): placeholders. Replace with real couples' words and
 * consent to publish — see CONTENT-CHECKLIST.md → "Testimonials".
 */
export type Testimonial = {
  quote: string;
  couple: string;
  city: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We forgot the camera was there. Months later the film showed us things we had missed living it.",
    couple: "Ramya & Karthik",
    city: "Rajahmundry",
  },
  {
    quote:
      "He shot our haldi like a scene from a film, not a checklist. The light, the noise, the whole morning.",
    couple: "Sravanthi & Aakash",
    city: "Hyderabad",
  },
  {
    quote:
      "Our families are spread across three cities. The film brought the whole day to all of them.",
    couple: "Deepika & Vishnu",
    city: "Visakhapatnam",
  },
];
