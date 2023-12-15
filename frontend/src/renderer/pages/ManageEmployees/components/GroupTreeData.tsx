import * as React from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';
import AddSubGroupModal from './AddSubGroupModal';
import EditSubGroupModal from './EditSubGroupModal';
import DeleteSubGroupModal from './DeleteSubGroupModal';

interface RenderTree {
  _id: string;
  parentAgencyId: string;
  name: string;
  isSubGroup: boolean;
  __v: number;
  subgroups?: readonly RenderTree[];
}

export default function GroupTreeData({
  groupData,
  setSelectedGroup,
  setSelectedGroupId,
  showSubGroups,
  setSubGroups,
  handleAddSubGroupFunction,
  handleEditSubGroupFunction,
  handleDeleteSubGroupFunction,
  selectedGroup,
  groupName,
  setGroupName,
  subGroups,
  selectedAgency,
  selectedGroupId,
}: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openAddSubGroupModal, setOpenAddSubGroupModal] = React.useState(false);
  const [openEditSubGroupModal, setOpenEditSubGroupModal] =
    React.useState(false);
  const [openDeleteSubGroupModal, setOpenDeleteSubGroupModal] =
    React.useState(false);

  React.useEffect(() => {
    const data = showSubGroups();
    setSubGroups(data);
  }, []);
  const handleSelectedGroup = ({ nodes }: any) => {
    setSelectedGroupId(nodes._id);
    setSelectedGroup(nodes.name);
  };
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const getSubGroupOptions = () => {
    const subGroupData = [
      { title: 'Add Sub Group', function: handleAddSubGroup },
      { title: 'Edit', function: handleEditSubGroup },
      { title: 'Delete', function: handleDeleteSubGroup },
    ];
    return subGroupData;
  };
  const handleAddSubGroup = () => {
    handleAddSubGroupFunction();
  };
  const handleEditSubGroup = () => {
    handleEditSubGroupFunction();
  };
  const handleDeleteSubGroup = () => {
    handleDeleteSubGroupFunction();
  };
  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      key={nodes._id}
      nodeId={nodes._id}
      label={
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {nodes.name}
            <IconButton
              size="small"
              onClick={(e) => {
                handleMenuClick(e);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </>
      }
      onClick={() => handleSelectedGroup({ nodes })}
    >
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {getSubGroupOptions().map((option, index) => (
          <MenuItem key={index} onClick={option.function}>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
      {Array.isArray(nodes.subgroups)
        ? nodes.subgroups.map((node) => renderTree(node))
        : null}
    </TreeItem>
    // <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name} onClick={()=>handleSelectedGroup({nodes})}>
    //   {Array.isArray(nodes.subgroups)
    //     ? nodes.subgroups.map((node) => renderTree(node))
    //     : null}
    // </TreeItem>
  );

  return (
    <Box sx={{ flexGrow: 1, width: 350 }}>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {groupData && groupData.map((val: RenderTree) => renderTree(val))}
      </TreeView>
      <AddSubGroupModal
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        groupName={groupName}
        setGroupName={setGroupName}
        subGroups={subGroups}
        open={openAddSubGroupModal}
        setOpen={setOpenAddSubGroupModal}
        selectedAgency={selectedAgency}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
      />
      <EditSubGroupModal
        open={openEditSubGroupModal}
        setOpen={setOpenEditSubGroupModal}
        selectedGroupId={selectedGroupId}
      />
      <DeleteSubGroupModal
        open={openDeleteSubGroupModal}
        setOpen={setOpenDeleteSubGroupModal}
        selectedGroupId={selectedGroupId}
      />
    </Box>
  );
}
