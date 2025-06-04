import { buttonVariants } from "@/components/ui/button";
import {
  FlipCard,
  FlipCardBack,
  FlipCardFront,
} from "@/components/ui/flip-card";
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "https://i.pravatar.cc/150?img=35",
    name: "Emma Smith",
    position: "Product Manager",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=60",
    name: "John Doe",
    position: "Tech Lead",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=36",
    name: "Ashley Ross",
    position: "Frontend Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },

      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=17",
    name: "Bruce Rogers",
    position: "Backend Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/leopoldo-miranda/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Facebook":
        return <Facebook size="20" />;

      case "Instagram":
        return <Instagram size="20" />;
    }
  };

  return (
    <section
      id="team"
      className="w-full max-w-screen-xl mx-auto py-6 xs:py-12 px-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Our Dedicated{" "}
        </span>
        Crew
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks }: TeamProps) => (
            <FlipCard
              key={name}
              className="relative mt-8 flex flex-col justify-center items-center w-full h-[340px]"
            >
              <FlipCardFront>
                <div className="bg-muted/50 rounded-xl border shadow flex flex-col items-center h-full w-full p-6 pt-16 relative">
                  <img
                    src={imageUrl}
                    alt={`${name} ${position}`}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full w-24 h-24 aspect-square object-cover border-4 border-background shadow"
                  />
                  <div className="mt-8 text-center w-full">
                    <div className="text-lg font-bold">{name}</div>
                    <div className="text-primary text-sm font-medium mb-2">
                      {position}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </div>
                  </div>
                </div>
              </FlipCardFront>
              <FlipCardBack>
                <div className="bg-muted/50 rounded-xl border shadow flex flex-col items-center h-full w-full p-6 pt-16 relative">
                  <div className="mt-8 text-center w-full">
                    <div className="text-lg font-bold">{name}</div>
                    <div className="text-primary text-sm font-medium mb-2">
                      {position}
                    </div>
                    <div className="mb-4 text-muted-foreground text-sm">
                      Connect with me:
                    </div>
                    <div className="flex justify-center gap-2">
                      {socialNetworks.map(
                        ({ name, url }: SociaNetworkslProps) => (
                          <a
                            key={name}
                            rel="noreferrer noopener"
                            href={url}
                            target="_blank"
                            className={buttonVariants({
                              variant: "ghost",
                              size: "sm",
                            })}
                          >
                            <span className="sr-only">{name} icon</span>
                            {socialIcon(name)}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </FlipCardBack>
            </FlipCard>
          )
        )}
      </div>
    </section>
  );
};
