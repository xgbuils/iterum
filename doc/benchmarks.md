# Benchmarks

```
benchmark
    combinations
        array
            with traversing
                - small
                    - iterum x 22,337 ops/sec ±0.39% (93 runs sampled)
                    - es-iter x 23,181 ops/sec ±1.70% (85 runs sampled)
                    Fastest is es-iter
                - medium
                    - iterum x 2,249 ops/sec ±0.24% (93 runs sampled)
                    - es-iter x 3,393 ops/sec ±1.30% (93 runs sampled)
                    Fastest is es-iter
                - big
                    - iterum x 179 ops/sec ±0.44% (80 runs sampled)
                    - es-iter x 307 ops/sec ±0.83% (88 runs sampled)
                    Fastest is es-iter
            without traversing
                - small
                    - iterum x 174,468 ops/sec ±0.87% (88 runs sampled)
                    - es-iter x 159,834 ops/sec ±3.76% (62 runs sampled)
                    Fastest is iterum
                - medium
                    - iterum x 171,997 ops/sec ±1.15% (89 runs sampled)
                    - es-iter x 148,490 ops/sec ±3.25% (65 runs sampled)
                    Fastest is iterum
                - big
                    - iterum x 177,383 ops/sec ±0.31% (94 runs sampled)
                    - es-iter x 116,880 ops/sec ±2.90% (75 runs sampled)
                    Fastest is iterum
    slice
        array
            iterable size
                - small
                    - iterum method x 6,032 ops/sec ±0.45% (94 runs sampled)
                    - iterum function x 5,877 ops/sec ±1.04% (93 runs sampled)
                    - imlazy x 11,295 ops/sec ±3.08% (75 runs sampled)
                    - ramda x 87,008 ops/sec ±0.38% (94 runs sampled)
                    - immutable method x 13,231 ops/sec ±2.31% (78 runs sampled)
                    - native x 7,134 ops/sec ±0.45% (93 runs sampled)
                    Fastest is ramda
                - medium
                    - iterum method x 241 ops/sec ±1.52% (84 runs sampled)
                    - iterum function x 243 ops/sec ±0.78% (85 runs sampled)
                    - imlazy x 1,372 ops/sec ±2.16% (87 runs sampled)
                    - ramda x 8,957 ops/sec ±1.02% (91 runs sampled)
                    - immutable method x 550 ops/sec ±1.42% (84 runs sampled)
                    - native x 225 ops/sec ±0.30% (85 runs sampled)
                    Fastest is ramda
                - big
                    - iterum method x 7.62 ops/sec ±0.36% (23 runs sampled)
                    - iterum function x 7.59 ops/sec ±0.33% (23 runs sampled)
                    - imlazy x 48.52 ops/sec ±0.59% (62 runs sampled)
                    - ramda x 318 ops/sec ±0.76% (86 runs sampled)
                    - immutable method x 14.55 ops/sec ±2.42% (40 runs sampled)
                    - native x 5.56 ops/sec ±1.51% (18 runs sampled)
                    Fastest is ramda
            number of maps
                - few
                    - iterum method x 803 ops/sec ±0.60% (91 runs sampled)
                    - iterum function x 806 ops/sec ±0.28% (91 runs sampled)
                    - imlazy x 1,787 ops/sec ±1.72% (90 runs sampled)
                    - ramda x 28,540 ops/sec ±0.86% (89 runs sampled)
                    - immutable method x 1,510 ops/sec ±1.50% (88 runs sampled)
                    - native x 746 ops/sec ±0.57% (91 runs sampled)
                    Fastest is ramda
                - enough
                    - iterum method x 244 ops/sec ±0.87% (85 runs sampled)
                    - iterum function x 242 ops/sec ±1.22% (85 runs sampled)
                    - imlazy x 1,372 ops/sec ±2.29% (87 runs sampled)
                    - ramda x 9,204 ops/sec ±1.04% (93 runs sampled)
                    - immutable method x 552 ops/sec ±1.58% (80 runs sampled)
                    - native x 225 ops/sec ±0.34% (85 runs sampled)
                    Fastest is ramda
                - a lot of
                    - iterum method x 71.18 ops/sec ±0.76% (71 runs sampled)
                    - iterum function x 70.80 ops/sec ±0.88% (71 runs sampled)
                    - imlazy x 509 ops/sec ±1.39% (85 runs sampled)
                    - ramda x 2,039 ops/sec ±0.72% (92 runs sampled)
                    - immutable method x 173 ops/sec ±1.61% (78 runs sampled)
                    - native x 65.06 ops/sec ±0.86% (66 runs sampled)
                    Fastest is ramda
    permutations
        array
            with traversing
                - small
                    - iterum x 37,336 ops/sec ±2.12% (92 runs sampled)
                    - es-iter x 2,622 ops/sec ±3.48% (72 runs sampled)
                    Fastest is iterum
                - medium
                    - iterum x 2,577 ops/sec ±1.74% (90 runs sampled)
                    - es-iter x 116 ops/sec ±3.12% (65 runs sampled)
                    Fastest is iterum
                - big
                    - iterum x 59.09 ops/sec ±1.68% (68 runs sampled)
                    - es-iter x 2.64 ops/sec ±5.78% (11 runs sampled)
                    Fastest is iterum
            without traversing
                - small
                    - iterum x 205,159 ops/sec ±1.04% (91 runs sampled)
                    - es-iter x 142,639 ops/sec ±3.19% (59 runs sampled)
                    Fastest is iterum
                - medium
                    - iterum x 214,832 ops/sec ±1.61% (92 runs sampled)
                    - es-iter x 130,455 ops/sec ±3.92% (60 runs sampled)
                    Fastest is iterum
                - big
                    - iterum x 215,941 ops/sec ±0.47% (92 runs sampled)
                    - es-iter x 127,060 ops/sec ±3.43% (62 runs sampled)
                    Fastest is iterum
    power
        array
            with traversing
                - small
                    - iterum power x 2,943 ops/sec ±0.84% (88 runs sampled)
                    - iterum product x 3,006 ops/sec ±1.83% (91 runs sampled)
                    Fastest is iterum product
                - medium
                    - iterum power x 378 ops/sec ±0.97% (88 runs sampled)
                    - iterum product x 414 ops/sec ±0.88% (88 runs sampled)
                    Fastest is iterum product
                - big
                    - iterum power x 36.14 ops/sec ±0.87% (61 runs sampled)
                    - iterum product x 40.03 ops/sec ±0.60% (52 runs sampled)
                    Fastest is iterum product
            without traversing
                - small
                    - iterum power x 154,050 ops/sec ±0.82% (92 runs sampled)
                    - iterum product x 185,696 ops/sec ±1.04% (90 runs sampled)
                    Fastest is iterum product
                - medium
                    - iterum power x 152,857 ops/sec ±2.34% (92 runs sampled)
                    - iterum product x 170,587 ops/sec ±2.66% (84 runs sampled)
                    Fastest is iterum product
                - big
                    - iterum power x 152,237 ops/sec ±2.22% (81 runs sampled)
                    - iterum product x 185,571 ops/sec ±1.09% (87 runs sampled)
                    Fastest is iterum product
    product
        array
            with traversing
                - small
                    - iterum x 3,921 ops/sec ±1.01% (92 runs sampled)
                    - es-iter x 4,716 ops/sec ±2.06% (89 runs sampled)
                    Fastest is es-iter
                - medium
                    - iterum x 1,036 ops/sec ±0.67% (90 runs sampled)
                    - es-iter x 1,333 ops/sec ±1.62% (91 runs sampled)
                    Fastest is es-iter
                - big
                    - iterum x 262 ops/sec ±0.95% (86 runs sampled)
                    - es-iter x 353 ops/sec ±1.12% (85 runs sampled)
                    Fastest is es-iter
            without traversing
                - small
                    - iterum x 186,192 ops/sec ±1.15% (90 runs sampled)
                    - es-iter x 90,485 ops/sec ±3.12% (70 runs sampled)
                    Fastest is iterum
                - medium
                    - iterum x 186,456 ops/sec ±0.30% (90 runs sampled)
                    - es-iter x 77,232 ops/sec ±3.38% (70 runs sampled)
                    Fastest is iterum
                - big
                    - iterum x 184,553 ops/sec ±0.71% (87 runs sampled)
                    - es-iter x 64,801 ops/sec ±3.02% (73 runs sampled)
                    Fastest is iterum
    slice
        array
            with traversing
                - small
                    - iterum x 99,064 ops/sec ±1.51% (82 runs sampled)
                    - imlazy x 100,181 ops/sec ±2.62% (86 runs sampled)
                    - ramda x 1,252,061 ops/sec ±1.42% (88 runs sampled)
                    - native x 1,502,197 ops/sec ±1.08% (86 runs sampled)
                    Fastest is native
                - medium
                    - iterum x 1,516 ops/sec ±0.85% (93 runs sampled)
                    - imlazy x 1,641 ops/sec ±1.07% (90 runs sampled)
                    - ramda x 144,946 ops/sec ±0.87% (93 runs sampled)
                    - native x 146,856 ops/sec ±1.03% (91 runs sampled)
                    Fastest is native
                - big
                    - iterum x 6.72 ops/sec ±4.35% (21 runs sampled)
                    - imlazy x 9.00 ops/sec ±0.70% (27 runs sampled)
                    - ramda x 3,076 ops/sec ±0.34% (92 runs sampled)
                    - native x 3,091 ops/sec ±0.62% (93 runs sampled)
                    Fastest is native
            without traversing
                - small
                    - iterum x 180,435 ops/sec ±0.33% (92 runs sampled)
                    - imlazy x 643,153 ops/sec ±0.27% (91 runs sampled)
                    - ramda x 3,201,144 ops/sec ±0.34% (92 runs sampled)
                    - native x 5,306,519 ops/sec ±0.46% (94 runs sampled)
                    Fastest is native
                - medium
                    - iterum x 175,993 ops/sec ±1.82% (90 runs sampled)
                    - imlazy x 641,839 ops/sec ±1.16% (93 runs sampled)
                    - ramda x 1,618,841 ops/sec ±1.23% (93 runs sampled)
                    - native x 2,035,047 ops/sec ±1.10% (92 runs sampled)
                    Fastest is native
                - big
                    - iterum x 175,527 ops/sec ±0.54% (92 runs sampled)
                    - imlazy x 645,693 ops/sec ±1.51% (90 runs sampled)
                    - ramda x 70,520 ops/sec ±0.85% (94 runs sampled)
                    - native x 70,027 ops/sec ±1.94% (90 runs sampled)
                    Fastest is imlazy
        set
            with traversing
                - small
                    - iterum x 93,405 ops/sec ±1.31% (91 runs sampled)
                    - imlazy x 95,592 ops/sec ±2.72% (87 runs sampled)
                    Fastest is imlazy
                - medium
                    - iterum x 1,419 ops/sec ±0.32% (93 runs sampled)
                    - imlazy x 1,588 ops/sec ±0.41% (91 runs sampled)
                    Fastest is imlazy
                - big
                    - iterum x 6.21 ops/sec ±4.36% (20 runs sampled)
                    - imlazy x 8.62 ops/sec ±0.37% (26 runs sampled)
                    Fastest is imlazy
            two calls with traversing
                - small
                    - iterum x 58,050 ops/sec ±1.11% (89 runs sampled)
                    - imlazy x 47,428 ops/sec ±2.78% (81 runs sampled)
                    Fastest is iterum
                - medium
                    - iterum x 699 ops/sec ±1.02% (90 runs sampled)
                    - imlazy x 753 ops/sec ±1.42% (88 runs sampled)
                    Fastest is imlazy
                - big
                    - iterum x 3.19 ops/sec ±3.99% (12 runs sampled)
                    - imlazy x 4.10 ops/sec ±1.99% (15 runs sampled)
                    Fastest is imlazy
            without traversing
                - small
                    - iterum x 156,562 ops/sec ±4.79% (83 runs sampled)
                    - imlazy x 576,296 ops/sec ±4.39% (87 runs sampled)
                    Fastest is imlazy
                - medium
                    - iterum x 170,621 ops/sec ±1.92% (87 runs sampled)
                    - imlazy x 593,671 ops/sec ±4.39% (87 runs sampled)
                    Fastest is imlazy
                - big
                    - iterum x 168,843 ops/sec ±0.37% (93 runs sampled)
                    - imlazy x 634,912 ops/sec ±0.36% (91 runs sampled)
                    Fastest is imlazy
```