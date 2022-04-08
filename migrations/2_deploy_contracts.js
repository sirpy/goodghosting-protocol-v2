const abi = require("ethereumjs-abi");
const GoodGhostingContract = artifacts.require("Pool");
const WhitelistedContract = artifacts.require("WhitelistedPool");
const MobiusStrategyArtifact = artifacts.require("MobiusStrategy");
const MoolaStrategyArtifact = artifacts.require("AaveStrategy");
const AaveV3StrategyArtifact = artifacts.require("AaveStrategyV3");
const CurveStrategyArtifact = artifacts.require("CurveStrategy");
const SafeMathLib = artifacts.require("SafeMath");

const config = require("../deploy.config");

function printSummary(
  // contract's constructor parameters
  {
    inboundCurrencyAddress,
    depositCount,
    maxFlexibleSegmentPaymentAmount,
    segmentLength,
    waitingRoundSegmentLength,
    segmentPaymentWei,
    earlyWithdrawFee,
    adminFee,
    maxPlayersCount,
    flexibleDepositSegment,
    strategy,
    mobiusPool,
    mobiusGauge,
    minter,
    mobi,
    celo,
    lendingPoolProvider,
    wethGateway,
    dataProvider,
    incentiveController,
    rewardToken,
    curvePool,
    curveGauge,
    tokenIndex,
    poolType,
    curve,
    wmatic,
    lendingPoolAddressProviderAave,
    wethGatewayAave,
    dataProviderAave,
    incentiveControllerAave,
    incentiveTokenAave,
  },
  // additional logging info
  { networkName, selectedProvider, inboundCurrencySymbol, segmentPayment, owner },
) {
  var poolParameterTypes = [
    "address", // inboundCurrencyAddress,
    "uint256", // maxFlexibleSegmentPaymentAmount
    "uint256", // depositCount
    "uint256", // segmentLength
    "uint256", // waitingRoundSegmentLength
    "uint256", // segmentPaymentWei
    "uint256", // earlyWithdrawFee
    "uint256", // adminFee
    "uint256", // maxPlayersCount
    "bool", // flexibleDepositSegment
    "address", // strategy
    "bool", // isTransactionalToken
  ];
  var poolParameterValues = [
    inboundCurrencyAddress,
    maxFlexibleSegmentPaymentAmount,
    depositCount,
    segmentLength,
    waitingRoundSegmentLength,
    segmentPaymentWei,
    earlyWithdrawFee,
    adminFee,
    maxPlayersCount,
    flexibleDepositSegment,
    strategy,
    config.deployConfigs.isTransactionalToken,
  ];

  var mobiusStrategyParameterTypes = [
    "address", // mobius pool
    "address", // mobius gauge
    "address", // minter
    "address", // mobi
    "address", // celo
  ];

  var mobiusStrategyValues = [mobiusPool, mobiusGauge, minter, mobi, celo];

  var moolaStrategyParameterTypes = [
    "address", // lendingPoolProvider
    "address", // wethGateway
    "address", // dataProvider
    "address", // incentiveController
    "address", // rewardToken
  ];

  var moolaStrategyValues = [lendingPoolProvider, wethGateway, dataProvider, incentiveController, rewardToken];
  var aaveStrategyValues = [
    lendingPoolAddressProviderAave,
    wethGatewayAave,
    dataProviderAave,
    incentiveControllerAave,
    incentiveTokenAave,
  ];

  var curveStrategyParameterTypes = [
    "address", // curvePool
    "address", // tokenIndex
    "uint", // poolType
    "uint", // curveGauge
    "address", // wmatic
    "address", // curve
  ];

  var curveStrategyValues = [curvePool, tokenIndex, poolType, curveGauge, wmatic, curve];

  var poolEncodedParameters = abi.rawEncode(poolParameterTypes, poolParameterValues);
  var mobiusStrategylEncodedParameters = abi.rawEncode(mobiusStrategyParameterTypes, mobiusStrategyValues);
  var moolsStrategylEncodedParameters = abi.rawEncode(moolaStrategyParameterTypes, moolaStrategyValues);
  var curveStrategylEncodedParameters = abi.rawEncode(curveStrategyParameterTypes, curveStrategyValues);
  var aaveStrategylEncodedParameters = abi.rawEncode(moolaStrategyParameterTypes, aaveStrategyValues);

  console.log("\n\n\n----------------------------------------------------");
  console.log("GoodGhosting Holding Pool deployed with the following arguments:");
  console.log("----------------------------------------------------\n");
  console.log(`Network Name: ${networkName}`);
  console.log(`Contract's Owner: ${owner}`);

  console.log(`Inbound Currency: ${inboundCurrencyAddress}`);
  console.log(`Maximum Flexible Segment Payment Amount: ${maxFlexibleSegmentPaymentAmount}`);

  console.log(`Segment Count: ${depositCount}`);
  console.log(`Segment Length: ${segmentLength} seconds`);
  console.log(`Waiting Segment Length: ${waitingRoundSegmentLength} seconds`);
  console.log(`Segment Payment: ${segmentPayment} ${inboundCurrencySymbol} (${segmentPaymentWei} wei)`);
  console.log(`Early Withdrawal Fee: ${earlyWithdrawFee}%`);
  console.log(`Custom Pool Fee: ${adminFee}%`);
  console.log(`Max Quantity of Players: ${maxPlayersCount}`);
  console.log(`Flexible Deposit Pool: ${flexibleDepositSegment}`);
  console.log(`Transactional Token Depsoit Pool: ${config.deployConfigs.isTransactionalToken}`);

  console.log(`Strategy: ${strategy}`);
  if (
    networkName === "local-celo-mobius" ||
    networkName === "local-variable-celo-mobius" ||
    networkName === "celo-mobius"
  ) {
    console.log(`Mobius Pool: ${mobiusPool}`);
    console.log(`Mobius Gauge: ${mobiusGauge}`);
    console.log(`Mobius Minter: ${minter}`);
    console.log(`Mobi Token: ${mobi}`);
    console.log(`Celo Token: ${celo}`);
    console.log("Mobius Strategy Encoded Params: ", mobiusStrategylEncodedParameters.toString("hex"));
  } else if (
    networkName === "local-celo-moola" ||
    networkName === "local-variable-celo-moola" ||
    networkName === "celo-moola"
  ) {
    console.log(`Lending Pool Provider: ${lendingPoolProvider}`);
    console.log(`WETHGateway: ${wethGateway}`);
    console.log(`Data Provider: ${dataProvider}`);
    console.log(`IncentiveController: ${incentiveController}`);
    console.log(`Reward Token: ${rewardToken}`);
    console.log("Moola Strategy Encoded Params: ", moolsStrategylEncodedParameters.toString("hex"));
  } else if (networkName == "polygon-aave" || networkName == "polygon-aaveV3") {
    console.log(`Lending Pool Provider: ${lendingPoolAddressProviderAave}`);
    console.log(`WETHGateway: ${wethGatewayAave}`);
    console.log(`Data Provider: ${dataProviderAave}`);
    console.log(`IncentiveController: ${incentiveControllerAave}`);
    console.log(`Reward Token: ${incentiveTokenAave}`);
    console.log("Aave Strategy Encoded Params: ", aaveStrategylEncodedParameters.toString("hex"));
  } else {
    console.log(`Curve Pool: ${curvePool}`);
    console.log(`Curve Gauge: ${curveGauge}`);
    console.log(`Token index: ${tokenIndex}`);
    console.log(`Pool Type: ${poolType}`);
    console.log(`Reward Token: ${wmatic}`);
    console.log(`Curve Token: ${curve}`);
    console.log("Curve Strategy Encoded Params: ", curveStrategylEncodedParameters.toString("hex"));
  }
  console.log("\n\nConstructor Arguments ABI-Encoded:");
  console.log(poolEncodedParameters.toString("hex"));
  console.log("\n\n\n\n");
}

module.exports = function (deployer, network, accounts) {
  // Injects network name into process .env variable to make accessible on test suite.
  process.env.NETWORK = network;

  // Skips migration for local tests and soliditycoverage
  if (["test", "soliditycoverage"].includes(network)) return;

  deployer.then(async () => {
    let maxFlexibleSegmentPaymentAmount, flexibleSegmentPayment;
    if (
      network === "local-variable-celo-mobius" ||
      network === "local-variable-celo-moola" ||
      network === "local-variable-polygon-curve"
    ) {
      flexibleSegmentPayment = true;
      maxFlexibleSegmentPaymentAmount = "1000000000000000000000";
    } else {
      flexibleSegmentPayment = config.deployConfigs.flexibleSegmentPayment;
      maxFlexibleSegmentPaymentAmount = config.deployConfigs.maxFlexibleSegmentPaymentAmount;
    }
    const mobiusPoolConfigs = config.providers["celo"]["mobius"];
    const moolaPoolConfigs = config.providers["celo"]["moola"];
    const curvePoolConfigs = config.providers["aave"]["polygon-curve"];
    const aavePoolConfigs =
      network == "polygon-aave" ? config.providers["aave"]["polygon"] : config.providers["aave"]["polygonv3"];
    const curvePool = curvePoolConfigs.pool;
    const curveGauge = curvePoolConfigs.gauge;
    const wmatic = curvePoolConfigs.wmatic;
    const curve = curvePoolConfigs.curve;
    const lendingPoolProvider = moolaPoolConfigs.lendingPoolAddressProvider;
    const dataProvider = moolaPoolConfigs.dataProvider;
    const mobiusGauge = mobiusPoolConfigs.gauge;
    const inboundCurrencyAddress =
      network === "local-celo-mobius" ||
      network === "local-variable-celo-mobius" ||
      network === "celo-mobius" ||
      network === "local-celo-moola" ||
      network === "local-variable-celo-moola" ||
      network === "celo-moola"
        ? mobiusPoolConfigs["cusd"].address
        : network === "polygon-aave" || network === "polygon-aaveV3"
        ? aavePoolConfigs["dai"].address
        : curvePoolConfigs["dai"].address;
    const inboundCurrencyDecimals = mobiusPoolConfigs["cusd"].decimals;
    const segmentPaymentWei = (config.deployConfigs.segmentPayment * 10 ** inboundCurrencyDecimals).toString();
    const mobiusPool = mobiusPoolConfigs.pool;
    const mobi = mobiusPoolConfigs.mobi;
    const celo = mobiusPoolConfigs.celo;
    const minter = mobiusPoolConfigs.minter;
    const maxPlayersCount = config.deployConfigs.maxPlayersCount;
    const goodGhostingContract = config.deployConfigs.isWhitelisted ? WhitelistedContract : GoodGhostingContract; // defaults to Ethereum version
    let strategyArgs;
    if (network === "local-celo-mobius" || network === "celo-mobius" || network === "local-variable-celo-mobius") {
      strategyArgs = [MobiusStrategyArtifact, mobiusPool, mobiusGauge, minter, mobi, celo];
    } else if (network === "local-celo-moola" || network === "local-variable-celo-moola" || network === "celo-moola") {
      strategyArgs = [
        MoolaStrategyArtifact,
        lendingPoolProvider,
        moolaPoolConfigs.wethGateway,
        dataProvider,
        moolaPoolConfigs.incentiveController,
        // wmatic address in case of aave deployments
        moolaPoolConfigs.incentiveToken,
        inboundCurrencyAddress,
      ];
    } else if (network === "polygon-aave" || network === "polygon-aaveV3") {
      strategyArgs = [
        network === "polygon-aave" ? MoolaStrategyArtifact : AaveV3StrategyArtifact,
        aavePoolConfigs.lendingPoolAddressProvider,
        aavePoolConfigs.wethGateway,
        aavePoolConfigs.dataProvider,
        aavePoolConfigs.incentiveController,
        aavePoolConfigs.wmatic,
        inboundCurrencyAddress,
      ];
    } else {
      strategyArgs = [
        CurveStrategyArtifact,
        curvePool,
        config.providers["aave"]["polygon-curve"].tokenIndex,
        config.providers["aave"]["polygon-curve"].poolType,
        curveGauge,
        wmatic,
        curve,
      ];
    }

    await deployer.deploy(...strategyArgs);
    let strategyInstance;
    if (network === "local-celo-mobius" || network === "celo-mobius" || network === "local-variable-celo-mobius")
      strategyInstance = await MobiusStrategyArtifact.deployed();
    else if (
      network === "local-celo-moola" ||
      network === "local-variable-celo-moola" ||
      network === "celo-moola" ||
      network === "polygon-aave" ||
      network === "polygon-aaveV3"
    )
      strategyInstance =
        network === "polygon-aaveV3" ? await AaveV3StrategyArtifact.deployed() : await MoolaStrategyArtifact.deployed();
    else strategyInstance = await CurveStrategyArtifact.deployed();

    // Prepares deployment arguments
    let deploymentArgs = [
      goodGhostingContract,
      inboundCurrencyAddress,
      maxFlexibleSegmentPaymentAmount,
      config.deployConfigs.depositCount,
      config.deployConfigs.segmentLength,
      config.deployConfigs.waitingRoundSegmentLength,
      segmentPaymentWei,
      config.deployConfigs.earlyWithdrawFee,
      config.deployConfigs.adminFee,
      maxPlayersCount,
      flexibleSegmentPayment,
      strategyInstance.address,
      config.deployConfigs.isTransactionalToken,
    ];

    // Deploys the Pool Contract
    await deployer.deploy(SafeMathLib);
    await deployer.link(SafeMathLib, goodGhostingContract);
    await deployer.deploy(...deploymentArgs);

    const ggInstance = await goodGhostingContract.deployed();

    await strategyInstance.transferOwnership(ggInstance.address);
    config.deployConfigs.isWhitelisted
      ? await ggInstance.initializePool(config.deployConfigs.merkleroot)
      : await ggInstance.initialize();
    // Prints deployment summary
    printSummary(
      {
        inboundCurrencyAddress,
        depositCount: config.deployConfigs.depositCount,
        maxFlexibleSegmentPaymentAmount,
        segmentLength: config.deployConfigs.segmentLength,
        waitingRoundSegmentLength: config.deployConfigs.waitingRoundSegmentLength,
        segmentPaymentWei,
        earlyWithdrawFee: config.deployConfigs.earlyWithdrawFee,
        adminFee: config.deployConfigs.adminFee,
        maxPlayersCount,
        flexibleDepositSegment: flexibleSegmentPayment,
        strategy: strategyInstance.address,
        mobiusPool,
        mobiusGauge,
        minter,
        mobi,
        celo,
        lendingPoolProvider,
        wethGateway: moolaPoolConfigs.wethGateway,
        dataProvider,
        incentiveController: moolaPoolConfigs.incentiveController,
        rewardToken: moolaPoolConfigs.incentiveToken,
        curvePool,
        curveGauge,
        tokenIndex: config.providers["aave"]["polygon-curve"].tokenIndex,
        poolType: config.providers["aave"]["polygon-curve"].poolType,
        curve,
        wmatic,
        lendingPoolAddressProviderAave: aavePoolConfigs.lendingPoolAddressProvider,
        wethGatewayAave: aavePoolConfigs.wethGateway,
        dataProviderAave: aavePoolConfigs.dataProvider,
        incentiveControllerAave: aavePoolConfigs.incentiveController,
        incentiveTokenAave: aavePoolConfigs.wmatic,
      },
      {
        networkName: process.env.NETWORK,
        selectedProvider: config.deployConfigs.selectedProvider,
        inboundCurrencySymbol: config.deployConfigs.inboundCurrencySymbol,
        segmentPayment: config.deployConfigs.segmentPayment,
        owner: accounts[0],
      },
    );
  });
};
