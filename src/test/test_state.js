import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import reducers from '../reducers/';

const createRecipeState = {
  "form": {
    "search": {
      "registeredFields": {
        "query": {
          "name": "query",
          "type": "Field",
          "count": 1
        }
      }
    },
    "reviews": {
      "values": {
        "rating": "Choose..."
      },
      "initial": {
        "rating": "Choose..."
      },
      "registeredFields": {
        "rating": {
          "name": "rating",
          "type": "Field",
          "count": 1
        },
        "review": {
          "name": "review",
          "type": "Field",
          "count": 1
        }
      }
    }
  },
  "auth": {
    "username": null,
    "authenticated": false
  },
  "recipes": {
    "data": [],
    "selectedRecipe": {
      "id": 85,
      "parent_id": null,
      "username": "Bluzkry",
      "recipeName": "Puella Magi Madoka Magica",
      "imageUrl": "http://i.imgur.com/t9wyn1y.jpg",
      "difficulty": "Easy",
      "description": "Puella Magi Madoka Magica (魔法少女まどか☆マギカ Mahō Shōjo Madoka Magika?, \"Magical Girl Madoka Magica\"), commonly referred to as simply Madoka Magica, is a Japanese anime television series produced by Shaft and Aniplex. It was directed by Akiyuki Shinbo and written by Gen Urobuchi, with original character designs by Ume Aoki, character design adaptation by Takahiro Kishida, and music by Yuki Kajiura. The story follows a group of female middle school students who choose to become magical girls and must battle surreal enemies called witches. However, they consequently learn of the anguish and perils associated with their newfound roles.",
      "cookTime": 1,
      "prepTime": 1,
      "servings": 1,
      "instructions": "The first ten episodes of the series aired in Japan on TBS and MBS between January and March 2011, while the final two episodes were delayed until April 2011 due to the 2011 Tōhoku earthquake and tsunami. A manga adaptation of the series and various spin-off manga series have been published by Houbunsha and licensed in North America by Yen Press.\nA novelisation by Nitroplus was released in August 2011, and a dedicated magazine, Manga Time Kirara Magica, was launched by Houbunsha in June 2012. A video game for the PlayStation Portable was released in March 2012, with another for PlayStation Vita released in December 2013. A film series has also been produced, consisting of two films recapping the anime series, released in October 2012, and a third film featuring an original story which was released on October 26, 2013. A concept film acting as a trailer for a new project was screened in December 2015.",
      "ingredients": {
        "quantity": [
          "1",
          "1",
          "1",
          "1"
        ],
        "items": [
          "Puella",
          "Magi",
          "Madoka",
          "Magica"
        ]
      },
      "userId": 1,
      "tags": [
        "Puella",
        "Magi",
        "Madoka",
        "Magica"
      ]
    },
    "userRecipes": [],
    "selectedVariation": null,
    "userVariations": [],
    "variations": {
      "85": [
        {
          "id": 89,
          "name": "Puella Magi Madoka Magica",
          "description": "Puella Magi Madoka Magica (魔法少女まどか☆マギカ Mahō Shōjo Madoka Magika?, \"Magical Girl Madoka Magica\"), commonly referred to as simply Madoka Magica, is a Japanese anime television series produced by Shaft and Aniplex. It was directed by Akiyuki Shinbo and written by Gen Urobuchi, with original character designs by Ume Aoki, character design adaptation by Takahiro Kishida, and music by Yuki Kajiura. The story follows a group of female middle school students who choose to become magical girls and must battle surreal enemies called witches. However, they consequently learn of the anguish and perils associated with their newfound roles.",
          "image": "http://i.imgur.com/t9wyn1y.jpg",
          "difficulty": "Easy",
          "cook_time": 1,
          "prep_time": 1,
          "servings": 1,
          "instructions": "In the fictional city of Mitakihara, Japan, a middle school student named Madoka Kaname and her friend Sayaka Miki encounter a small, cat-like creature named Kyubey. It offers a contract in which a girl may have any wish granted in exchange for obtaining magical powers and being tasked with fighting against witches. Meanwhile, a transfer student and magical girl named Homura Akemi tries to stop Madoka from making the contract with Kyubey at all costs. Madoka and Sayaka then meet Mami Tomoe, an upperclassman at the same school who is also a magical girl and offers to bring them along on her witch hunts so that they may learn of the responsibilities that come with being a magical girl.",
          "user_id": 1,
          "parent_id": 85,
          "username": "Bluzkry",
          "ingredients": {
            "quantity": [
              "1",
              "1",
              "1",
              "1"
            ],
            "items": [
              "Puella",
              "Magi",
              "Madoka",
              "Magica"
            ]
          },
          "tags": [
            "Puella",
            "Magi",
            "Madoka",
            "Magica"
          ]
        },
        {
          "id": 91,
          "name": "Puella Magi Madoka Magica",
          "description": "Puella Magi Madoka Magica (魔法少女まどか☆マギカ Mahō Shōjo Madoka Magika?, \"Magical Girl Madoka Magica\"), commonly referred to as simply Madoka Magica, is a Japanese anime television series produced by Shaft and Aniplex. It was directed by Akiyuki Shinbo and written by Gen Urobuchi, with original character designs by Ume Aoki, character design adaptation by Takahiro Kishida, and music by Yuki Kajiura. The story follows a group of female middle school students who choose to become magical girls and must battle surreal enemies called witches. However, they consequently learn of the anguish and perils associated with their newfound roles.",
          "image": "http://i.imgur.com/t9wyn1y.jpg",
          "difficulty": "Easy",
          "cook_time": 1,
          "prep_time": 1,
          "servings": 1,
          "instructions": "In his role as producer, Iwakami took a mostly hands-off approach. Due to Puella Magi Madoka Magica being an original series rather than an adaptation based off an already existing work, he described the main goal solely as \"coming up with a high-quality piece of entertainment.\" After helping to recruit the staff, he allowed them mostly free rein in developing the actual content of the story, providing minimal guidance from himself. After viewing the character designs that Aoki created, he became fully assured that he could trust the creative talent of the team. In an interview with Anime News Network after the series finished airing in Japan, Iwakami summed up his philosophy as \"I don't matter much; it's up to those talents to do their work. If something comes to a stand-still I might intervene, but they did an excellent job and I was very happy seeing the results in episode one.\"[3]",
          "user_id": 5,
          "parent_id": 85,
          "username": "kurt",
          "ingredients": {
            "quantity": [
              "1",
              "1",
              "1",
              "1"
            ],
            "items": [
              "Puella",
              "Magi",
              "Madoka",
              "Magica"
            ]
          },
          "tags": [
            "Puella",
            "Magi",
            "Madoka",
            "Magica"
          ]
        }
      ]
    }
  },
  "reviews": {
    "data": [
      {
        "id": 26,
        "review": "Puella Magi Madoka Magica has received universal critical acclaim, with critics praising the writing, visuals, and soundtrack of the series as well as its unorthodox approach to the magical girl subgenre. It has also been a commercial success, with each BD volume selling more than 50,000 copies. The series has won several awards in Japan, such as the Television Award at the 16th Animation Kobe Awards, as well as 12 Newtype Anime Awards and the Grand Prize for animation in the 2011 Japan Media Arts awards.",
        "recipe_id": 85,
        "rating": 5,
        "user_id": 1,
        "username": "Bluzkry"
      },
      {
        "id": 30,
        "review": "While collaborating on Hidamari Sketch and Bakemonogatari, Akiyuki Shinbo expressed to Aniplex producer Atsuhiro Iwakami his desire to create a new magical girl series, thus spawning the development of Puella Magi Madoka Magica. During the early planning stage, Iwakami decided not to adapt an existing work in order to give Shinbo more freedom in his direction style.[2] Another goal of the project was to develop an anime that could appeal to a wider audience than the usual demographic for media within the magical girl genre. Iwakami and Shinbo intended for their series to be accessible to \"the general anime fan.\"[3] Shinbo then contacted Gen Urobuchi to work on the project as a scriptwriter and Ume Aoki as a character designer.[2] Takahiro Kishida was also enlisted to adapt Aoki's character designs for production of the television series.[4]",
        "recipe_id": 85,
        "rating": 2,
        "user_id": 5,
        "username": "kurt"
      }
    ]
  },
  "favorites": {
    "data": []
  },
  "follows": {
    "data": [],
    "dataForUser": []
  },
  "userInfo": {
    "Bluzkry": {
      "favoritesCount": 6,
      "recipesCount": 2,
      "sporksCount": 2,
      "followersCount": 3,
      "followsCount": 3
    },
    "kurt": {
      "favoritesCount": 6,
      "recipesCount": 2,
      "sporksCount": 2,
      "followersCount": 3,
      "followsCount": 3
    }
  },
  "search": {
    "searchResults": []
  },
  "profile": {
    "data": {
      "bio": "",
      "image": "",
      "style": "",
      "location": ""
    }
  },
  "recipeInfo": {
    "data": {
      "favoritesCount": 2
    }
  }
};

export const createRecipeStore = applyMiddleware(Thunk)(createStore)(reducers, createRecipeState);

