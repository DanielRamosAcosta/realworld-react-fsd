const seed =
  (process.env.TEST_WORKER_INDEX ?? 'x').toString() +
  (process.env.TEST_PARALLEL_INDEX ?? 'y').toString();

const str = (str: string): string => `${seed} ${str}`;

export const CHRISTMAS_GIFTS = {
  title: str('5 Useful Christmas Gifts Perfect for a Cat Owner'),
  description: str('Some ideas for last minutes Christmas gifts'),
  body: str(`As a proud cat owner, I spoil my cats by buying them expensive food and toys).

There is always something missing, no matter how many times I go to the pet store.

So when it comes to Christmas, I love receiving something for my cats too; it makes me happy, saves some money, and I know they would appreciate it too.

If you are looking for a gift for a cat owner, pick one from the list below, and you will get it right!

# Blanket and cushions
Cats love boxes, but they love them even more if you put inside them a soft cushion. The cat’s bed gets even more comfortable with a soft and cozy blanket. These two items are essential for a perfect place where to nap during cold months.

There are also beds you can hang to the radiator for cats sensitive to cold temperatures.

My cats wander outside, so I wash their blankets often because they get filthy fast. Sometimes I feel like I don’t have enough blankets for my five cats, so I can’t help buying more during sales.`),
  tags: str('car christmas gifts'),
};
