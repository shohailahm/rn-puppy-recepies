import React from 'react';
import { FlatList, StyleSheet, Text, SafeAreaView,View } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

interface DATAOBJ {
 href: string,
ingredients: string,
thumbnail: string,
title:string,
} 
interface IProps {
  item:DATAOBJ
}


const Home: React.FC = (props) => {
    const [data, setdata] = React.useState<Array<any>>([])
  const [page, setpage] = React.useState<number>(1)
  React.useEffect(() => {
    const getData = async():Promise<Array<DATAOBJ>|undefined> => {
      try {
        const response = await fetch(`http://www.recipepuppy.com/api/?p=${page || 1}`);
        const body = await response.json();
        if (page) {
          let dataArr = [...data, ...body.results];
          setdata(dataArr);
          return;
        }
        setdata(body.results);
        return body;
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  
  }, [page])
  
  const renderItem = ({item}:IProps) => {
    return (
        <ListItem  bottomDivider onPress={()=>goToDetails(item)}>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>

        </ListItem.Content>
         <ListItem.Chevron />
      </ListItem>
      )
}

  const goToDetails=(obj:DATAOBJ): void=>{
    props.navigation.navigate('Details', {
      data:obj
    });
  }

  const loadMore = () => {
    setpage(page + 1);

  }

  return (
     <SafeAreaView style={styles.container}>
      <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.title} onEndReached={loadMore} onEndReachedThreshold={ 0.5 }/>
     </SafeAreaView>
    
  )
}



const styles = StyleSheet.create({
 container: {
    flex: 1,
    marginTop:  0,
  },
  mb: {
   marginVertical:8  
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection:'row'
  }
})

export default Home;