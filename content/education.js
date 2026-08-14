/**
 * Education, newest first.
 *
 * @type {import('./types').School[]}
 */
export const education = [
  {
    qualification: "B.E. Information Technology",
    institution: "St. Francis Institute of Technology",
    location: "Mumbai, India",
    start: "Aug 2019",
    end: "Jul 2023",
  },
  {
    qualification: "Higher Secondary Certificate (12th)",
    institution: "Thomas Baptista Junior College",
    location: "Vasai, India",
    start: "Aug 2017",
    end: "May 2019",
  },
  {
    // Spans the full school career at St. Anthony's, not just the final
    // year — which is why the range is much longer than the HSC above.
    qualification: "Secondary School Certificate (10th)",
    institution: "St. Anthony's Convent High School",
    location: "Vasai, India",
    start: "Jun 2005",
    end: "Jun 2017",
  },
];

export default education;
