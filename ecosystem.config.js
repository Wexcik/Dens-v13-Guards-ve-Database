module.exports = {
  apps : [{
    exec_mode: 'cluster',
    name: 'Database',
    script: './Database-guard/dens.js',
    watch: '.'
  },{
    exec_mode: 'cluster',
    name: 'Guard2',
    script: './Guard2/main.js',
    watch: '.'
  },{
    exec_mode: 'cluster',
    name: 'Guard3',
    script: './Guard3/main.js',
    watch: '.'
  },{
    exec_mode: 'cluster',
    name: 'Guard4',
    script: './Guard4/main.js',
    watch: '.'
  },{
    exec_mode: 'cluster',
    name: 'Guard5',
    script: './Guard5/main.js',
    watch: '.'
  }
  ],

 
};
