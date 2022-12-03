import create from "zustand";
// import scheduleService from "./../services/scheduleService";

const testimonyStore = create((set) => ({
  testimonies: [
    {
      id: 1,
      name: "Obinna Wike",
      title: "Software Engineer",
      info: "ar far away, in the galaxy, lies the only race left, the people of karamara from UAR. Last specie of all living & non living things about to go extinct. They possess so many abilities with special interoperable blockchain mindset and quantum computer thinking variables, but here comes",
    },
    {
      id: 2,
      name: "Obinna Wike",
      title: "Software Engineer",
      info: "ar far away, in the galaxy, lies the only race left, the people of karamara from UAR. Last specie of all living & non living things about to go extinct. They possess so many abilities with special interoperable blockchain mindset and quantum computer thinking variables, but here comes",
    },
    {
      id: 3,
      name: "Obinna Wike",
      title: "Software Engineer",
      info: "ar far away, in the galaxy, lies the only race left, the people of karamara from UAR. Last specie of all living & non living things about to go extinct. They possess so many abilities with special interoperable blockchain mindset and quantum computer thinking variables, but here comes",
    },
    {
      id: 4,
      name: "Obinna Wike",
      title: "Software Engineer",
      info: "ar far away, in the galaxy, lies the only race left, the people of karamara from UAR. Last specie of all living & non living things about to go extinct. They possess so many abilities with special interoperable blockchain mindset and quantum computer thinking variables, but here comes",
    },
    {
      id: 5,
      name: "Obinna Wike",
      title: "Software Engineer",
      info: "ar far away, in the galaxy, lies the only race left, the people of karamara from UAR. Last specie of all living & non living things about to go extinct. They possess so many abilities with special interoperable blockchain mindset and quantum computer thinking variables, but here comes",
    },
  ],
  // addPokemons: (pokemon) =>
  // set((state) => ({
  //  pokemons: [
  //  { name: pokemon.name, id: Math.random() * 100 },
  //   ...state.pokemons,
  //  ]})),
  // removePokemon: (id) =>
  //  set((state) => ({
  //    pokemons: state.pokemons.filter((pokemon) => pokemon.id !== id),
  //  })),
}));
export default testimonyStore;
