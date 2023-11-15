export const getPizzaPrice = (params) => {
  const ingredientsTotalPrice = params.ingredients
    .filter((product) => product.name)
    .reduce(
      (sum, ingredient) => sum + ingredient.price * ingredient.quantity,
      0
    );

  const multiplier = params.size.multiplier;

  return (
    multiplier *
    (params.sauce.price + params.dough.price + ingredientsTotalPrice)
  );
};
