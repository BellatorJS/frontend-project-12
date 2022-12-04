
  import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';


  import axios from 'axios';

  //import {resetToDefault} from '../Reset/reset-action';
  
  export const postlogin = createAsyncThunk(
    '@@login',
    async (value, {extra: api}) => {
      return api.postLogin(value)
    }
  );
  export const fetchContent = createAsyncThunk(
    '@@fetchContent',
    async (getAuth, {extra: api}) => {
      return api.fetchData(getAuth)
    }
  )



  /*const chatAdapter = createEntityAdapter({
    selectId:(channel)=>channel.id
  }
    
  );*/
  const initialState = {
    entities: [],
    loading: 'idle',
  }



 const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
  
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchContent.fulfilled, (state, action) => {
        console.log(action.payload)
        // Add user to the state array
        state.entities.push(action.payload)
        console.log(state.entities)
      })
    },
  
    
  });
  
  export const chatReducer = chatSlice.reducer;

  //export const {addTodo}= chatSlice.actions
  //export const chatSelectors = chatAdapter.getSelectors(state => state.chat);

/*
  extraReducers: (builder) => {
    builder
      .addCase(postlogin.pending, (state, action) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(postlogin.rejected, (state) => {
        state.loading = 'idle';
        state.error = 'Something went wrong!'
      })
      /*.addCase(postlogin.fulfilled, (state, action) => {
        chatAdapter.addMany(state, action.payload);
      })
      .addCase(fetchContent.pending, (state, action) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchContent.rejected, (state) => {
        state.loading = 'idle';
        state.error = 'Something went wrong!'
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        console.log("Я тут")
        console.log(action.payload)
       const {channels,messages,currentChannelId} = action.payload
       console.log(channels)
       console.log(messages)
       console.log(currentChannelId)
      
     
        chatAdapter.setAll(state, action.payload);
      })

  }
});

*/






















 /* const todosAdapter = createEntityAdapter({
    selectId: (todo) => todo.id,
  });
  
  export const loadTodos = createAsyncThunk(
    '@@todos/load-all',
    async (_, {
      rejectWithValue, extra: api
    }) => {
      try {
        return api.loadTodos();
      } catch(err) {
        return rejectWithValue('Failed to fetch all todos.')
      }
    },
    {
      condition: (_, {getState, extra}) => {
        const {loading} = getState().todos;
  
        if (loading === 'loading') {
          return false;
        }
      }
    }
  );
  
  export const createTodo = createAsyncThunk(
    '@@todos/create-todo',
    async (title, {extra: api}) => {
      return api.createTodo(title)
    }
  );
  export const toggleTodo = createAsyncThunk(
    '@@todos/toggle-todo',
    async (id, {getState, extra: api}) => {
      const todo = getState().todos.entities[id];
  
      return api.toggleTodo(id, {completed: !todo.completed});
    }
  );
  export const removeTodo = createAsyncThunk(
    '@@todos/remove-todo',
    async (id, {extra: api}) => {
      return api.removeTodo(id);
    }
  );
  
  const todoSlice = createSlice({
    name: '@@todos',
    initialState: todosAdapter.getInitialState({
      loading: 'idle',
      error: null
    }),
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(resetToDefault, () => {
          return []
        })
        .addCase(loadTodos.pending, (state, action) => {
          state.loading = 'loading';
          state.error = null;
        })
        .addCase(loadTodos.rejected, (state) => {
          state.loading = 'idle';
          state.error = 'Something went wrong!'
        })
        .addCase(loadTodos.fulfilled, (state, action) => {
          todosAdapter.addMany(state, action.payload);
          // state.entities = action.payload;
        })
        .addCase(createTodo.fulfilled, (state, action) => {
          todosAdapter.addOne(state, action.payload);
          // state.entities.push(action.payload)
        })
        .addCase(toggleTodo.fulfilled, (state, action) => {
          const updatedTodo = action.payload;
  
          // const index = state.entities.findIndex(todo => todo.id === updatedTodo.id);
          // state.entities[index] = updatedTodo;
  
          todosAdapter.updateOne(state, {
            id: updatedTodo.id,
            changes: {
              completed: updatedTodo.completed
            }
          })
        })
        .addCase(removeTodo.fulfilled, (state, action) => {
          // state.entities = state.entities.filter(todo => todo.id !== action.payload);
          todosAdapter.removeOne(state, action.payload);
        })
        .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
          state.loading = 'idle';
          state.error = action.payload || action.error.message;
        })
        .addMatcher((action) => action.type.endsWith('/fulfilled'), (state, action) => {
          state.loading = 'idle';
        })
    }
  });
  
  export const todoReducer = todoSlice.reducer;
  export const todosSelectors = todosAdapter.getSelectors(state => state.todos);
  
  export const selectVisibleTodos = (todos = [], filter) => {
    switch (filter) {
      case 'all': {
        return todos;
      }
      case 'active': {
        return todos.filter(todo => !todo.completed);
      }
      case 'completed': {
        return todos.filter(todo => todo.completed);
      }
      default: {
        return todos;
      }
    }
  }



*/












