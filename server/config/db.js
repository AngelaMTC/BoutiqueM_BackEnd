process.env.PORT = process.env.PORT || 5000;
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

if (process.env.NODE_ENV === "dev") {
  process.env.URLDB =
    "mongodb+srv://Admin:admin1234@arkusnexus.d1uky.mongodb.net/boutiqueM?retryWrites=true&w=majority";
} else {
  process.env.URLDB =
    "mongodb+srv://Admin:admin1234@arkusnexus.d1uky.mongodb.net/boutiqueM?retryWrites=true&w=majority";
}

process.middlewares = [];
