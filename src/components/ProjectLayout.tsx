interface ProjectLayoutProps {
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  links?: { icon: React.ReactNode; url: string }[];
}

const ProjectLayout: React.FC<ProjectLayoutProps> = ({ title, shortDescription, description, images, links }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-8 text-left mt-24">

      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-white">{title}</h1>

        <p className="text-2xl text-blue-300 font-medium">
          {shortDescription}
        </p>

        <p className="text-white text-lg leading-relaxed">
          {description}
        </p>

        {links && links.length > 0 && (
          <div className="flex space-x-4 mt-4">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-3 rounded-full hover:bg-blue-300 transition"
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <img
          src={images[0]}
          alt=""
          className="rounded-lg w-full object-cover"
        />

        <div className="grid grid-cols-2 gap-4">
          <img
            src={images[1]}
            alt=""
            className="rounded-lg w-full object-cover"
          />
          <img
            src={images[2]}
            alt=""
            className="rounded-lg w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;
