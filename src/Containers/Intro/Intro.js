import Logo from "../../assets/chibi.png";

export default function Intro() {
    return (
      <>
        <img src={Logo} className="App-logo" alt="logo" />
        <p className="p-header">
          Welcome to Cleric's Cantrips! Since 2014,
          the Cosplay Cleric has been offering free
          cosplay repair at conventions across California
          and Nevada, and has helped over 4,000 cosplayers
          repair their cosplays in an emergency. Sales from
          this shop directly help the cleric get to more
          conventions and help more cosplayers and costumes.
        </p>
      </>
    );
}