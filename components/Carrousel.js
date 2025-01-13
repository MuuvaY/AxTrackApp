// import React from "react";
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// import Animated, {
//   useAnimatedScrollHandler,
//   useSharedValue,
//   useAnimatedStyle,
//   interpolate,
// } from "react-native-reanimated";

// const { width: SCREEN_WIDTH } = Dimensions.get("window");

// const HeaderCarousel = ({ exercice, formattedDate, timer, theme }) => {
//   const { colors, fonts } = theme;
//   const translateX = useSharedValue(0);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       translateX.value = event.contentOffset.x;
//     },
//   });

//   // Récupération des réglages disponibles
//   const reglages = [
//     { label: "Réglage Poulie", value: exercice?.reglage_poulie },
//     { label: "Réglage Banc", value: exercice?.reglage_banc },
//     { label: "Réglage Dossier", value: exercice?.reglage_dossier },
//     { label: "Réglage Thoracique", value: exercice?.reglage_thoracique },
//     { label: "Réglage Assise", value: exercice?.reglage_assise },
//     { label: "Réglage Prise", value: exercice?.reglage_prise },
//   ].filter((reglage) => reglage.value); // Filtre uniquement les réglages non nuls

//   const pages = [
//     {
//       title: null, // Pas de titre pour la première page
//       content: [
//         { label: "Dernière modification", value: formattedDate },
//         {
//           label: "Durée",
//           value: `${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`,
//         },
//       ],
//     },
//     {
//       title: null, // Pas de titre pour la deuxième page
//       content: reglages.length > 0 ? reglages : [{ label: "Aucun réglage disponible", value: "" }],
//     },
//   ];

//   const styles = StyleSheet.create({
//     header: {
//       backgroundColor: colors.secondary,
//       width: "100%",
//       height: 280,
//       borderBottomRightRadius: 20,
//       borderBottomLeftRadius: 20,
//     },
//     headerContainer: {
//       alignItems: "center",
//       marginTop: "15%",
//     },
//     headerTitle: {
//       color: colors.background,
//       fontFamily: fonts.bold,
//       fontSize: 50,
//       opacity: 0.9,
//     },
//     headerLabel: {
//       color: colors.background,
//       fontFamily: fonts.bold,
//       fontSize: 20,
//     },
//     headerValue: {
//       color: colors.background,
//       fontFamily: fonts.medium,
//       fontSize: 20,
//     },
//     headerInfoGrid: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//       justifyContent: "space-between",
//       marginTop: 30,
//       width: "100%",
//       paddingHorizontal: 35,
//     },
//     headerItem: {
//       width: "45%", // Deux colonnes
//       marginBottom: 20,
//     },
//     paginationContainer: {
//       flexDirection: "row",
//       justifyContent: "center",
//       bottom: 10,
//     },
//     paginationDot: {
//       width: 12,
//       height: 4,
//       borderRadius: 30,
//       backgroundColor: colors.background,
//       marginHorizontal: 4,
//     },
//   });

//   const Page = ({ page, index }) => {
//     const rStyle = useAnimatedStyle(() => {
//       const inputRange = [
//         (index - 1) * SCREEN_WIDTH,
//         index * SCREEN_WIDTH,
//         (index + 1) * SCREEN_WIDTH,
//       ];

//       const opacity = interpolate(translateX.value, inputRange, [0, 1, 0]);

//       const translateXAnimated = interpolate(translateX.value, inputRange, [
//         SCREEN_WIDTH / 2,
//         0,
//         -SCREEN_WIDTH / 2,
//       ]);

//       return {
//         opacity,
//         transform: [{ translateX: translateXAnimated }],
//       };
//     });

//     return (
//       <Animated.View
//         style={[
//           {
//             width: SCREEN_WIDTH,
//             paddingHorizontal: 20,
//           },
//           rStyle,
//         ]}
//       >
//         <View style={styles.headerContainer}>
//           {page.title && <Text style={styles.headerTitle}>{page.title}</Text>}
//         </View>
//         <View style={styles.headerInfoGrid}>
//           {page.content.map((item, idx) => (
//             <View key={idx} style={styles.headerItem}>
//               <Text style={styles.headerLabel}>{item.label}</Text>
//               <Text style={styles.headerValue}>{item.value}</Text>
//             </View>
//           ))}
//         </View>
//       </Animated.View>
//     );
//   };

//   const PaginationDots = () => {
//     const dots = pages.map((_, index) => {
//       const dotStyle = useAnimatedStyle(() => {
//         const opacity = interpolate(
//           translateX.value,
//           [
//             (index - 1) * SCREEN_WIDTH,
//             index * SCREEN_WIDTH,
//             (index + 1) * SCREEN_WIDTH,
//           ],
//           [0.5, 1, 0.5]
//         );
//         const scale = interpolate(
//           translateX.value,
//           [
//             (index - 1) * SCREEN_WIDTH,
//             index * SCREEN_WIDTH,
//             (index + 1) * SCREEN_WIDTH,
//           ],
//           [1, 1.2, 1]
//         );

//         return {
//           opacity,
//           transform: [{ scale }],
//         };
//       });

//       return (
//         <Animated.View key={index} style={[styles.paginationDot, dotStyle]} />
//       );
//     });

//     return <View style={styles.paginationContainer}>{dots}</View>;
//   };

//   return (
//     <View style={styles.header}>
//       <Animated.ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={scrollHandler}
//         scrollEventThrottle={16}
//       >
//         {pages.map((page, index) => (
//           <Page key={index} page={page} index={index} />
//         ))}
//       </Animated.ScrollView>
//       <PaginationDots />
//     </View>
//   );
// };

// export default HeaderCarousel;
// import React from "react";
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// import Animated, {
//   useAnimatedScrollHandler,
//   useSharedValue,
//   useAnimatedStyle,
//   interpolate,
// } from "react-native-reanimated";

// const { width: SCREEN_WIDTH } = Dimensions.get("window");

// const HeaderCarousel = ({ exercice, formattedDate, timer, theme }) => {
//   const { colors, fonts } = theme;
//   const translateX = useSharedValue(0);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       translateX.value = event.contentOffset.x;
//     },
//   });

//   const pages = [
//     {
//       title: exercice?.nom_exercice,
//       content: [
//         { label: "Dernière modification", value: formattedDate },
//         {
//           label: "Durée",
//           value: `${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`,
//         },
//       ],
//     },
//     {
//       title: null,
//       content: [
//         { label: "Réglage poulie", value: exercice?.reglage_poulie || "N/A" },
//         { label: "Réglage banc", value: exercice?.reglage_banc || "N/A" },
//         { label: "Réglage dossier", value: exercice?.reglage_dossier || "N/A" },
//         {
//           label: "Réglage thoracique",
//           value: exercice?.reglage_thoracique || "N/A",
//         },
//         { label: "Réglage assise", value: exercice?.reglage_assise || "N/A" },
//         { label: "Réglage prise", value: exercice?.reglage_prise || "N/A" },
//       ],
//     },
//   ];

//   const styles = StyleSheet.create({
//     header: {
//       backgroundColor: colors.secondary,
//       width: "100%",
//       height: 280,
//       borderBottomRightRadius: 20,
//       borderBottomLeftRadius: 20,
//     },
//     headerContainer: {
//       alignItems: "center",
//       marginTop: "15%",
//     },
//     headerTitle: {
//       color: colors.background,
//       fontFamily: fonts.bold,
//       fontSize: 50,
//       opacity: 0.9,
//     },
//     headerLabel: {
//       color: colors.background,
//       fontFamily: fonts.bold,
//       fontSize: 20,
//     },
//     headerValue: {
//       color: colors.background,
//       fontFamily: fonts.medium,
//       fontSize: 20,
//     },
//     headerInfo: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       marginTop: 70,
//       width: "100%",
//       paddingHorizontal: 35,
//     },
//     headerInfoGrid: {
//       flexDirection: "row",
//       flexWrap: "wrap",
//       // justifyContent: "center", // Centrage horizontal
//       // alignItems: "center", // Centrage vertical
//       height: "100%", // Assure que le conteneur occupe tout l'espace disponible
//       width: "100%",
//     },
//     headerItem: {
//       width: "45%",
//       marginBottom: 20,
//     },
//     paginationContainer: {
//       flexDirection: "row",
//       justifyContent: "center",
//       bottom: 10,
//     },
//     paginationDot: {
//       width: 12,
//       height: 4,
//       borderRadius: 30,
//       backgroundColor: colors.background,
//       marginHorizontal: 4,
//     },
//   });

//   const Page = ({ page, index }) => {
//     const rStyle = useAnimatedStyle(() => {
//       const inputRange = [
//         (index - 1) * SCREEN_WIDTH,
//         index * SCREEN_WIDTH,
//         (index + 1) * SCREEN_WIDTH,
//       ];

//       const opacity = interpolate(translateX.value, inputRange, [0, 1, 0]);

//       const translateXAnimated = interpolate(translateX.value, inputRange, [
//         SCREEN_WIDTH / 2,
//         0,
//         -SCREEN_WIDTH / 2,
//       ]);

//       return {
//         opacity,
//         transform: [{ translateX: translateXAnimated }],
//       };
//     });

//     const isSecondPage = index === 1;

//     return (
//       <Animated.View
//         style={[
//           {
//             width: SCREEN_WIDTH,
//             paddingHorizontal: 20,
//           },
//           rStyle,
//         ]}
//       >
//         <View style={styles.headerContainer}>
//           {page.title && <Text style={styles.headerTitle}>{page.title}</Text>}
//         </View>

//         {isSecondPage ? (
//           <View style={styles.headerInfoGrid}>
//             {page.content.map((item, idx) => (
//               <View key={idx} style={styles.headerItem}>
//                 <Text style={styles.headerLabel}>{item.label}</Text>
//                 <Text style={styles.headerValue}>{item.value}</Text>
//               </View>
//             ))}
//           </View>
//         ) : (
//           <View style={styles.headerInfo}>
//             {page.content.map((item, idx) => (
//               <View key={idx}>
//                 <Text style={styles.headerLabel}>{item.label}</Text>
//                 <Text style={styles.headerValue}>{item.value}</Text>
//               </View>
//             ))}
//           </View>
//         )}
//       </Animated.View>
//     );
//   };

//   const PaginationDots = () => {
//     const dots = pages.map((_, index) => {
//       const dotStyle = useAnimatedStyle(() => {
//         const opacity = interpolate(
//           translateX.value,
//           [
//             (index - 1) * SCREEN_WIDTH,
//             index * SCREEN_WIDTH,
//             (index + 1) * SCREEN_WIDTH,
//           ],
//           [0.5, 1, 0.5]
//         );
//         const scale = interpolate(
//           translateX.value,
//           [
//             (index - 1) * SCREEN_WIDTH,
//             index * SCREEN_WIDTH,
//             (index + 1) * SCREEN_WIDTH,
//           ],
//           [1, 1.2, 1]
//         );

//         return {
//           opacity,
//           transform: [{ scale }],
//         };
//       });

//       return (
//         <Animated.View key={index} style={[styles.paginationDot, dotStyle]} />
//       );
//     });

//     return <View style={styles.paginationContainer}>{dots}</View>;
//   };

//   return (
//     <View style={styles.header}>
//       <Animated.ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={scrollHandler}
//         scrollEventThrottle={16}
//       >
//         {pages.map((page, index) => (
//           <Page key={index} page={page} index={index} />
//         ))}
//       </Animated.ScrollView>
//       <PaginationDots />
//     </View>
//   );
// };

// export default HeaderCarousel;

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HeaderCarousel = ({ exercice, formattedDate, timer, theme }) => {
  const { colors, fonts } = theme;
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });

  const pages = [
    {
      title: exercice?.nom_exercice,
      content: [
        { label: "Dernière modification", value: formattedDate },
        {
          label: "Durée",
          value: `${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`,
        },
      ],
    },
    {
      title: null,
      content: (() => {
        const reglages = [
          { label: "Réglage poulie", value: exercice?.reglage_poulie || "N/A" },
          { label: "Réglage banc", value: exercice?.reglage_banc || "N/A" },
          {
            label: "Réglage dossier",
            value: exercice?.reglage_dossier || "N/A",
          },
          {
            label: "Réglage thoracique",
            value: exercice?.reglage_thoracique || "N/A",
          },
          { label: "Réglage assise", value: exercice?.reglage_assise || "N/A" },
          { label: "Réglage prise", value: exercice?.reglage_prise || "N/A" },
        ];

        const reglagesDisponibles = reglages.filter((r) => r.value !== "N/A");

        if (reglagesDisponibles.length === 0) {
          return [{ label: "Aucun réglage", value: "" }];
        }

        return reglagesDisponibles;
      })(),
    },
  ];

  const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.secondary,
      width: "100%",
      height: 280,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    headerContainer: {
      alignItems: "center",
      marginTop: "15%",
    },
    headerTitle: {
      color: colors.background,
      fontFamily: fonts.bold,
      fontSize: 50,
      opacity: 0.9,
    },
    headerLabel: {
      color: colors.background,
      fontFamily: fonts.bold,
      fontSize: 20,
    },
    headerValue: {
      color: colors.background,
      fontFamily: fonts.medium,
      fontSize: 20,
    },
    headerInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 70,
      width: "100%",
      paddingHorizontal: 35,
      marginBottom: 20,
    },
    // headerInfoGrid: {
    //   flexDirection: "row",
    //   flexWrap: "wrap",
    //   justifyContent: "space-between",
    //   paddingHorizontal: 35,
    //   width: "100%",
    //   // marginTop: 20,
    //   // flex: 1,
    // },
    // headerItem: {
    //   width: "48%",
    //   marginBottom: 20,
    // },
    // headerInfoGrid: {
    //   flexDirection: "row",
    //   flexWrap: "wrap",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   width: "100%",
    //   paddingHorizontal: 20,
    //   marginTop: 20,
    // },

    // headerGridItem: {
    //   width: "45%",
    //   marginBottom: 15,
    //   // alignItems: "center",
    // },
    headerInfoGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 35,
      marginTop: 20,
    },

    headerGridItem: {
      width: "auto",
      marginBottom: 15,
      alignItems: "flex-start",
    },

    headerGridItemRight: {
      alignItems: "flex-start",
    },

    headerLabel: {
      color: colors.background,
      fontFamily: fonts.bold,
      fontSize: 20,
      textAlign: "left",
    },

    headerValue: {
      color: colors.background,
      fontFamily: fonts.medium,
      fontSize: 20,
      textAlign: "left",
    },

    headerLabelRight: {
      textAlign: "right",
    },

    headerValueRight: {
      textAlign: "right",
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      bottom: 10,
    },
    paginationDot: {
      width: 12,
      height: 4,
      borderRadius: 30,
      backgroundColor: colors.background,
      marginHorizontal: 4,
    },
  });

  const Page = ({ page, index }) => {
    const rStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ];

      const opacity = interpolate(translateX.value, inputRange, [0, 1, 0]);

      const translateXAnimated = interpolate(translateX.value, inputRange, [
        SCREEN_WIDTH / 2,
        0,
        -SCREEN_WIDTH / 2,
      ]);

      return {
        opacity,
        transform: [{ translateX: translateXAnimated }],
      };
    });

    const isSecondPage = index === 1;

    return (
      <Animated.View
        style={[
          {
            width: SCREEN_WIDTH,
            flex: 1,
            justifyContent: "space-between",
          },
          rStyle,
        ]}
      >
        <View style={styles.headerContainer}>
          {page.title && <Text style={styles.headerTitle}>{page.title}</Text>}
        </View>

        {isSecondPage ? (
          <View style={styles.headerInfoGrid}>
            <View>
              {page.content
                .slice(0, Math.ceil(page.content.length / 2))
                .map((item, idx) => (
                  <View key={idx} style={styles.headerGridItem}>
                    <Text style={styles.headerLabel}>{item.label}</Text>
                    <Text style={styles.headerValue}>{item.value}</Text>
                  </View>
                ))}
            </View>
            <View>
              {page.content
                .slice(Math.ceil(page.content.length / 2))
                .map((item, idx) => (
                  <View
                    key={idx}
                    style={[styles.headerGridItem, styles.headerGridItemRight]}
                  >
                    <Text style={[styles.headerLabel, styles.headerLabelRight]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.headerValue, styles.headerValueRight]}>
                      {item.value}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        ) : (
          <View style={styles.headerInfo}>
            {page.content.map((item, idx) => (
              <View key={idx}>
                <Text style={styles.headerLabel}>{item.label}</Text>
                <Text style={styles.headerValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        )}
      </Animated.View>
    );
  };

  const PaginationDots = () => {
    const dots = pages.map((_, index) => {
      const dotStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
          translateX.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          [0.5, 1, 0.5]
        );
        const scale = interpolate(
          translateX.value,
          [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          [1, 1.2, 1]
        );

        return {
          opacity,
          transform: [{ scale }],
        };
      });

      return (
        <Animated.View key={index} style={[styles.paginationDot, dotStyle]} />
      );
    });

    return <View style={styles.paginationContainer}>{dots}</View>;
  };

  return (
    <View style={styles.header}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {pages.map((page, index) => (
          <Page key={index} page={page} index={index} />
        ))}
      </Animated.ScrollView>
      <PaginationDots />
    </View>
  );
};

export default HeaderCarousel;
