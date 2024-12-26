import { Text, View, ViewToken, Dimensions } from "react-native";
import { ImageSliderType } from "@/data/SliderData";
import SliderItem from "./SliderItem";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  scrollTo,
} from "react-native-reanimated";
import Pagination from "./Paginations";
import { useEffect, useRef, useState } from "react";

type Props = {
  itemList: ImageSliderType[];
};
const { width } = Dimensions.get("screen");
const Slider = ({ itemList }: Props) => {
  //scrollX:Valeur initial avant le scroll es a 0
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [data, setData] = useState(itemList);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const offset = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  //isAutoPlay
  useEffect(() => {
    if (isAutoPlay == true) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 5000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setPaginationIndex(viewableItems[0].index % itemList.length);
    }
  };
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);
  return (
    <View className=" mt-5">
      <Animated.FlatList
        ref={ref}
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        //affiche les data en scroll horizontal
        horizontal
        //masque la bar de scroll du bass
        showsHorizontalScrollIndicator={false}
        //???
        pagingEnabled
        //onScroll:es un evenment
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={() => setData([...data, ...itemList])}
        onEndReachedThreshold={0.5}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onScrollEndDrag={() => {
          setIsAutoPlay(true);
        }}
      />
      <Pagination
        items={itemList}
        scrollX={scrollX}
        paginationIndex={paginationIndex}
      />
    </View>
  );
};
export default Slider;
