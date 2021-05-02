import React, { useState } from 'react';
import FlexLayout from "flexlayout-react";
import './App.css';
import 'flexlayout-react/style/gray.css'
import TabNode from 'flexlayout-react/declarations/model/TabNode';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Grid, GridList } from '@material-ui/core';

const style = (theme: Theme) => createStyles({
  panelLeft: {
    background: 'linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.75) 70%, rgba(255,255,255,0.1) 100%)',
    bottom: 0,
    left: 0,
    paddingLeft: 2,
    position: 'absolute',
    top: 0,
  },
  sideButton: {
    '& .circle': {
      background: 'rgba(255, 255, 255, 0.75)',
      borderRadius: '50%',
      color: 'rgba(0, 0, 0, 0.54)',
      height: '3rem',
      padding: theme.spacing(1.5),
      width: '3rem',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  panelHost: {
    position: 'relative',
  },
  document: {
    '& .draggable': {
    },
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  draggableContent: {
    alignItems: 'center',
    background: theme.palette.background.paper,
    display: 'inline-flex',
    height: 100,
    justifyContent: 'center',
    margin: 1,
    minWidth: 300,
  },
});

const json = {
  global: {},
  borders: [],
  layout:{
    "type": "row",
    "weight": 100,
    "children": [
      {
        "type": "tabset",
        "weight": 50,
        "selected": 0,
        "children": [
          {
            "type": "tab",
            "name": "Floatable Panel with Draggable",
            "component": "floatable",
            "enableFloat": true,
          }
        ]
      },
      {
        "type": "tabset",
        "weight": 50,
        "selected": 0,
        "children": [
          {
            "type": "tab",
            "name": "Default Panel",
            "component": "default",
          }
        ]
      }
    ]
  }
};

const App: React.FunctionComponent<WithStyles> = ({ classes }) => {
  const [model] = useState(FlexLayout.Model.fromJson(json));

  const onDragEnd = (result: DropResult, provided: ResponderProvided): void => {
    
    console.log(result);
    console.log(provided);

    return;
  }

  const factory = (node: TabNode) => {
    const component = node.getComponent();
    if (component === "floatable") {
      return <div>
        <div className={classes.document}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="contents" type="content" direction="vertical">
              {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Draggable draggableId={`1`} index={0}>
                  {(draggableProvided) => (
                    <div
                      className="draggable"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                    >
                      <Grid container={true} direction="column">
                        <Grid className={classes.panelHost} container={true} item={true} direction="row">
                          <Grid style={{ padding: 2 }} container={true} item={true} direction="row">
                              <GridList className={classes.pageList}>
                                <Droppable droppableId={`1`} direction="horizontal" type="page">
                                {(provided, snapshot) => (
                                  <div
                                    className="droppable"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                  >
                                    <div className={classes.draggableContent}>
                                        <div>Draggable Content 1</div>
                                    </div>
                                  </div>
                                )}
                                </Droppable>
                              </GridList>
                          </Grid>
                          <div className={classes.panelLeft + ' ' + classes.sideButton} {...draggableProvided.dragHandleProps}>
                            <div className="circle">
                              <DragHandleIcon />
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </Draggable>
                <Draggable draggableId={`2`} index={1}>
                  {(draggableProvided) => (
                    <div
                      className="draggable"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                    >
                      <Grid container={true} direction="column">
                        <Grid className={classes.panelHost} container={true} item={true} direction="row">
                          <Grid style={{ padding: 2 }} container={true} item={true} direction="row">
                              <GridList className={classes.pageList}>
                                <Droppable droppableId={`2`} direction="horizontal" type="page">
                                {(provided, snapshot) => (
                                  <div
                                    className="droppable"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                  >
                                    <div className={classes.draggableContent}>
                                        <div>Draggable Content 2</div>
                                    </div>
                                  </div>
                                )}
                                </Droppable>
                              </GridList>
                          </Grid>
                          <div className={classes.panelLeft + ' ' + classes.sideButton} {...draggableProvided.dragHandleProps}>
                            <div className="circle">
                              <DragHandleIcon />
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </Draggable>
                {provided.placeholder}
              </div>
            )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>;
    } else if (component === "default") {
      return <div><p>This is a default panel</p></div>;
    }
  }
  return (
    <FlexLayout.Layout model={model} factory={factory} supportsPopout={true} />
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default  withStyles(style)(App);
