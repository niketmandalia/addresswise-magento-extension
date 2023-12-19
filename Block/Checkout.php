<?php

namespace AddressWise\AddressWise\Block;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use Magento\Store\Model\StoreManagerInterface;
use AddressWise\AddressWise\Helper\Data;

/**
 * Customer block for handling  Addresswise functionality.
 *
 * @SuppressWarnings(PHPMD.TooManyFields)
 */

class Checkout extends Template
{
    /**
     * @var Data
     */
    protected $_helperData;

    /**
     * Checkout constructor.
     *
     * @param Context $context
     * @param Data $helperData
     * @param StoreManagerInterface $storeManager
     * @param array $data
     */
    public function __construct(
        Context $context,
        Data $helperData,
        StoreManagerInterface $storeManager,
        array $data = []
    ) {
        $this->_storeManager = $storeManager;
        parent::__construct($context, $data);
        $this->_helperData = $helperData;
    }

    /**
     * Check if the block is enabled.
     *
     * @return bool
     */

    public function isEnabled(): bool
    {
        return $this->_helperData->isEnabled();
    }

    /**
     * Get the client token.
     *
     * @return string|null
     */
    public function getClientToken(): ?string
    {
        return $this->_helperData->getClientToken();
    }
}
