import { MovieDetails } from "@/components/features/voting/MovieDetailModal";

export const MOVIES_DATA: MovieDetails[] = [
    {
        id: "rush-hour",
        title: "Rush Hour",
        year: 1998,
        runtime: "1h 38min",
        genre: "Action • Comedy",
        rating: "7.0/10",
        director: "Brett Ratner",
        cast: ["Jackie Chan", "Chris Tucker", "Tom Wilkinson", "Elizabeth Peña"],
        synopsis: "A loyal and dedicated Hong Kong Inspector teams up with a loudmouthed LAPD detective to rescue the Chinese Consul's kidnapped daughter. Their clashing styles and cultures create chaos, but their unlikely partnership proves to be the key to cracking the case. Get ready for martial arts mayhem and non-stop laughs!",
        posterUrl: "/posters/rush-hour.png"
    },
    {
        id: "ride-along",
        title: "Ride Along",
        year: 2014,
        runtime: "1h 39min",
        genre: "Action • Comedy",
        rating: "6.2/10",
        director: "Tim Story",
        cast: ["Ice Cube", "Kevin Hart", "John Leguizamo", "Tika Sumpter"],
        synopsis: "Security guard Ben must prove himself to his girlfriend's overprotective brother James, a tough Atlanta cop. When Ben is accepted into the police academy, James invites him on a ride-along designed to scare him off. But when they stumble onto a major case, Ben gets the chance to prove his worth.",
        posterUrl: "/posters/ride-along.png"
    },
    {
        id: "godfather",
        title: "The Godfather",
        year: 1972,
        runtime: "2h 55min",
        genre: "Crime • Drama",
        rating: "9.2/10",
        director: "Francis Ford Coppola",
        cast: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
        synopsis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son. This epic tale of family, loyalty, and power has defined cinema for generations. An offer you can't refuse.",
        posterUrl: "/posters/godfather.png"
    },
    {
        id: "annabelle",
        title: "Annabelle",
        year: 2014,
        runtime: "1h 39min",
        genre: "Horror • Mystery",
        rating: "5.4/10",
        director: "John R. Leonetti",
        cast: ["Annabelle Wallis", "Ward Horton", "Tony Amendola", "Alfre Woodard"],
        synopsis: "A couple begins to experience terrifying supernatural occurrences involving a vintage doll shortly after their home is invaded by satanic cultists. The doll becomes a conduit for an evil entity that will stop at nothing to possess their souls. Sweet dreams!",
        posterUrl: "/posters/annabelle.png"
    },
    {
        id: "interstellar",
        title: "Interstellar",
        year: 2014,
        runtime: "2h 49min",
        genre: "Sci-Fi • Drama",
        rating: "8.7/10",
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
        synopsis: "When Earth becomes uninhabitable, a former NASA pilot leads a team of astronauts through a wormhole near Saturn in search of a new home for humanity. A visually stunning journey through space and time that explores love, sacrifice, and the survival of our species.",
        posterUrl: "/posters/interstellar.png"
    },
    {
        id: "osofia-london",
        title: "Osofia in London",
        year: 2003,
        runtime: "1h 55min",
        genre: "Comedy • Drama",
        rating: "7.5/10",
        director: "Kingsley Ogoro",
        cast: ["Nkem Owoh", "Tina Mba", "Francis Odega", "Mabel Oboh"],
        synopsis: "When a Nigerian villager inherits a fortune from his late brother in London, he travels to the UK to claim it. Culture clash comedy ensues as Osofia navigates the bewildering world of British society while trying to outsmart those who want his inheritance. A Nollywood classic that will have you rolling with laughter!",
        posterUrl: "/posters/osofia-london.png"
    },
    {
        id: "home-alone",
        title: "Home Alone",
        year: 1990,
        runtime: "1h 43min",
        genre: "Comedy • Family",
        rating: "7.7/10",
        director: "Chris Columbus",
        cast: ["Macaulay Culkin", "Joe Pesci", "Daniel Stern", "Catherine O'Hara"],
        synopsis: "An eight-year-old troublemaker, mistakenly left home alone, must defend his home against a pair of burglars on Christmas Eve. Armed with an arsenal of household booby traps, Kevin proves that you don't need to be big to be dangerous. A holiday classic for all ages!",
        posterUrl: "/posters/home-alone.png"
    },
    {
        id: "james-bond",
        title: "James Bond",
        year: 2021,
        runtime: "2h 43min",
        genre: "Action • Thriller",
        rating: "7.3/10",
        director: "Cary Joji Fukunaga",
        cast: ["Daniel Craig", "Rami Malek", "Léa Seydoux", "Ana de Armas"],
        synopsis: "Recruited to rescue a kidnapped scientist, James Bond finds himself on a collision course with a mysterious villain armed with dangerous new technology. In his final mission, 007 must confront his past and make the ultimate sacrifice. Bond. James Bond.",
        posterUrl: "/posters/james-bond.png"
    },
    {
        id: "titanic",
        title: "Titanic",
        year: 1997,
        runtime: "3h 14min",
        genre: "Romance • Drama",
        rating: "7.9/10",
        director: "James Cameron",
        cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Kathy Bates"],
        synopsis: "A seventeen-year-old aristocrat falls in love with a poor artist aboard the luxurious, ill-fated R.M.S. Titanic. Their forbidden romance unfolds against the backdrop of one of history's greatest disasters. Near, far, wherever you are... this film will stay in your heart.",
        posterUrl: "/posters/titanic.png"
    },
    {
        id: "mask",
        title: "The Mask",
        year: 1994,
        runtime: "1h 41min",
        genre: "Comedy • Fantasy",
        rating: "6.9/10",
        director: "Chuck Russell",
        cast: ["Jim Carrey", "Cameron Diaz", "Peter Riegert", "Amy Yasbeck"],
        synopsis: "Bank clerk Stanley Ipkiss is transformed into a manic superhero when he wears a mysterious mask. With his newfound powers, he takes on gangsters, woos the beautiful Tina, and causes cello-playing mayhem across Edge City. Ssssmokin'!",
        posterUrl: "/posters/mask.png"
    }
];

// Helper to get movie by ID
export function getMovieById(id: string): MovieDetails | undefined {
    return MOVIES_DATA.find(movie => movie.id === id);
}

// Simple movie info for the list
export const MOVIES = MOVIES_DATA.map(m => ({
    id: m.id,
    title: m.title,
    posterUrl: m.posterUrl
}));
