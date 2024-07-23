import Socials from "./Socials";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Socials
            containerStyles="flex gap-x-6 mx-auto xl:mx-0 mb-4"
            iconsStyles="text-primary dark:text-white text-[30px] hover:text-white dark:hover:text-primary transition-all"
          />
          <div className="text-muted-foreground">
            Copyright &copy; Rexon Pambujya
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
