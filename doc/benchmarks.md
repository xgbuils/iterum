```
benchmark
    combinations
        array
            with traversing
                - small
                    - iterum x 19,091 ops/sec ±0.20% (88 runs sampled)
                    - es-iter x 22,987 ops/sec ±1.70% (87 runs sampled)
                    Fastest is es-iter
                - medium
                    - iterum x 1,979 ops/sec ±0.28% (94 runs sampled)
                    - es-iter x 3,362 ops/sec ±1.36% (92 runs sampled)
                    Fastest is es-iter
                - big
                    - iterum x 157 ops/sec ±0.87% (85 runs sampled)
                    - es-iter x 305 ops/sec ±0.85% (88 runs sampled)
                    Fastest is es-iter
            without traversing
                - small
                    - iterum x 116,880 ops/sec ±0.90% (94 runs sampled)
                    - es-iter x 148,916 ops/sec ±4.52% (62 runs sampled)
                    Fastest is es-iter
                - medium
                    - iterum x 118,325 ops/sec ±1.03% (94 runs sampled)
                    - es-iter x 144,079 ops/sec ±3.36% (66 runs sampled)
                    Fastest is es-iter
                - big
                    - iterum x 117,181 ops/sec ±1.29% (92 runs sampled)
                    - es-iter x 112,483 ops/sec ±2.94% (70 runs sampled)
                    Fastest is iterum
    permutations
        array
            with traversing
                - small
                    - iterum x 30,514 ops/sec ±0.35% (93 runs sampled)
                    - es-iter x 2,837 ops/sec ±2.36% (77 runs sampled)
                    Fastest is iterum
                - medium
                    - iterum x 2,202 ops/sec ±1.02% (93 runs sampled)
                    - es-iter x 133 ops/sec ±2.45% (74 runs sampled)
                    Fastest is iterum
                - big
                    - iterum x 53.96 ops/sec ±0.21% (68 runs sampled)
                    - es-iter x 2.82 ops/sec ±1.62% (12 runs sampled)
                    Fastest is iterum
            without traversing
                - small
                    - iterum x 146,629 ops/sec ±0.35% (92 runs sampled)
                    - es-iter x 142,010 ops/sec ±3.79% (68 runs sampled)
                    Fastest is iterum,es-iter
                - medium
                    - iterum x 147,123 ops/sec ±0.90% (91 runs sampled)
                    - es-iter x 139,503 ops/sec ±2.99% (66 runs sampled)
                    Fastest is iterum
                - big
                    - iterum x 147,867 ops/sec ±0.27% (89 runs sampled)
                    - es-iter x 134,356 ops/sec ±4.15% (64 runs sampled)
                    Fastest is iterum,es-iter
    power
        array
            with traversing
                - small
                    - iterum power x 1,987 ops/sec ±0.26% (94 runs sampled)
                    - iterum product x 2,627 ops/sec ±0.24% (93 runs sampled)
                    Fastest is iterum product
                - medium
                    - iterum power x 252 ops/sec ±1.42% (82 runs sampled)
                    - iterum product x 347 ops/sec ±1.01% (89 runs sampled)
                    Fastest is iterum product
                - big
                    - iterum power x 24.33 ops/sec ±0.14% (44 runs sampled)
                    - iterum product x 33.19 ops/sec ±0.53% (57 runs sampled)
                    Fastest is iterum product
            without traversing
                - small
                    - iterum power x 109,499 ops/sec ±0.79% (92 runs sampled)
                    - iterum product x 138,860 ops/sec ±1.22% (88 runs sampled)
                    Fastest is iterum product
                - medium
                    - iterum power x 107,934 ops/sec ±1.67% (89 runs sampled)
                    - iterum product x 139,370 ops/sec ±1.11% (90 runs sampled)
                    Fastest is iterum product
                - big
                    - iterum power x 108,830 ops/sec ±1.10% (91 runs sampled)
                    - iterum product x 139,643 ops/sec ±1.06% (91 runs sampled)
                    Fastest is iterum product
    product
        array
            with traversing
                - small
                    - iterum x 3,274 ops/sec ±1.21% (92 runs sampled)
                    - es-iter x 4,762 ops/sec ±1.76% (88 runs sampled)
                    Fastest is es-iter
                - medium
                    - iterum x 864 ops/sec ±1.25% (91 runs sampled)
                    - es-iter x 1,330 ops/sec ±1.37% (91 runs sampled)
                    Fastest is es-iter
                - big
                    - iterum x 220 ops/sec ±0.68% (82 runs sampled)
                    - es-iter x 346 ops/sec ±1.23% (89 runs sampled)
                    Fastest is es-iter
            without traversing
                - small
                    - iterum x 140,714 ops/sec ±1.16% (92 runs sampled)
                    - es-iter x 94,605 ops/sec ±2.27% (76 runs sampled)
                    Fastest is iterum
                - medium
                    - iterum x 140,426 ops/sec ±1.37% (92 runs sampled)
                    - es-iter x 81,372 ops/sec ±2.78% (71 runs sampled)
                    Fastest is iterum
                - big
                    - iterum x 137,699 ops/sec ±0.42% (91 runs sampled)
                    - es-iter x 66,986 ops/sec ±2.85% (78 runs sampled)
                    Fastest is iterum
    slice
        array
            with traversing
                - small
                    - iterum x 76,888 ops/sec ±0.78% (88 runs sampled)
                    - imlazy x 105,341 ops/sec ±2.48% (88 runs sampled)
                    - ramda x 1,275,981 ops/sec ±1.72% (94 runs sampled)
                    - native x 1,517,578 ops/sec ±1.27% (84 runs sampled)
                    Fastest is native
                - medium
                    - iterum x 1,484 ops/sec ±0.58% (92 runs sampled)
                    - imlazy x 1,685 ops/sec ±1.02% (93 runs sampled)
                    - ramda x 148,798 ops/sec ±0.83% (93 runs sampled)
                    - native x 153,889 ops/sec ±0.92% (93 runs sampled)
                    Fastest is native
                - big
                    - iterum x 6.75 ops/sec ±3.18% (21 runs sampled)
                    - imlazy x 9.62 ops/sec ±0.25% (28 runs sampled)
                    - ramda x 3,241 ops/sec ±1.68% (93 runs sampled)
                    - native x 3,271 ops/sec ±0.13% (92 runs sampled)
                    Fastest is native,ramda
            without traversing
                - small
                    - iterum x 127,097 ops/sec ±0.36% (88 runs sampled)
                    - imlazy x 661,547 ops/sec ±0.55% (89 runs sampled)
                    - ramda x 3,306,763 ops/sec ±0.29% (90 runs sampled)
                    - native x 5,232,812 ops/sec ±0.95% (90 runs sampled)
                    Fastest is native
                - medium
                    - iterum x 125,073 ops/sec ±1.78% (92 runs sampled)
                    - imlazy x 653,945 ops/sec ±1.39% (91 runs sampled)
                    - ramda x 1,627,703 ops/sec ±1.46% (94 runs sampled)
                    - native x 2,022,904 ops/sec ±1.14% (92 runs sampled)
                    Fastest is native
                - big
                    - iterum x 125,547 ops/sec ±0.44% (90 runs sampled)
                    - imlazy x 657,263 ops/sec ±0.22% (92 runs sampled)
                    - ramda x 69,047 ops/sec ±1.48% (90 runs sampled)
                    - native x 70,276 ops/sec ±1.13% (94 runs sampled)
                    Fastest is imlazy
        set
            with traversing
                - small
                    - iterum x 80,322 ops/sec ±1.43% (94 runs sampled)
                    - imlazy x 96,666 ops/sec ±2.98% (87 runs sampled)
                    Fastest is imlazy
                - medium
                    - iterum x 1,372 ops/sec ±0.27% (92 runs sampled)
                    - imlazy x 1,612 ops/sec ±0.31% (92 runs sampled)
                    Fastest is imlazy
                - big
                    - iterum x 6.19 ops/sec ±5.12% (20 runs sampled)
                    - imlazy x 9.03 ops/sec ±0.50% (26 runs sampled)
                    Fastest is imlazy
            two calls with traversing
                - small
                    - iterum x 44,948 ops/sec ±0.26% (95 runs sampled)
                    - imlazy x 48,092 ops/sec ±3.81% (84 runs sampled)
                    Fastest is imlazy
                - medium
                    - iterum x 699 ops/sec ±2.06% (89 runs sampled)
                    - imlazy x 818 ops/sec ±1.46% (90 runs sampled)
                    Fastest is imlazy
                - big
                    - iterum x 3.00 ops/sec ±1.17% (12 runs sampled)
                    - imlazy x 4.57 ops/sec ±0.46% (16 runs sampled)
                    Fastest is imlazy
            without traversing
                - small
                    - iterum x 112,897 ops/sec ±0.21% (93 runs sampled)
                    - imlazy x 651,781 ops/sec ±0.49% (93 runs sampled)
                    Fastest is imlazy
                - medium
                    - iterum x 112,273 ops/sec ±0.25% (92 runs sampled)
                    - imlazy x 669,441 ops/sec ±0.15% (93 runs sampled)
                    Fastest is imlazy
                - big
                    - iterum x 112,483 ops/sec ±1.70% (92 runs sampled)
                    - imlazy x 640,481 ops/sec ±2.91% (89 runs sampled)
                    Fastest is imlazy
```