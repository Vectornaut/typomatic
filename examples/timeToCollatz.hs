timeToCollatz :: Integer -> Integer
timeToCollatz n
  | n == 1 = 0
  | odd n  = n + 1 + timeToCollatz (quot (3*n + 1) 2)
  | even n = n + timeToCollatz (quot n 2)
