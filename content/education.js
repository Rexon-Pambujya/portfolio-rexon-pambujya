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
    // FIXME(rexon): these dates are identical to the 12th above — they were
    // duplicated in the old Education.jsx. SSC is normally the two years
    // before HSC (so roughly Aug 2015 – May 2017). Correct and delete this note.
    qualification: "Secondary School Certificate (10th)",
    institution: "St. Anthony's Convent High School",
    location: "Vasai, India",
    start: "Aug 2017",
    end: "May 2019",
  },
];

export default education;
